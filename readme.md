# TikTok Uploader

# Architecture

<p align: center>
    <img width="1015" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/fbc00596-f7da-49e8-86d0-25a3a01bcd56">
</p>

---------

## React
1. Run command 
```js
npm create-react-app front-end
```
2. Update `App.js` file as specified in files here.
3. Run command
```js
npm start
```
----------

## Data 
1. The data format is `parquet`
2. The understood file size for the production workload is 1TB/file. At the moment the sample files are parquet ~100MB. 

> ACTION: We will need to have an example file. We will also need a detailed understanding the parsing, storage, encryption, model, and retention rules around these data files. 

-----------

## AWS
### IAM 
1. Go to console, and select the IAM Service
2. Go to `Roles` > `Create Role` 
3. Choose `Lambda` > Click `Next`
4. You will attach 2 policies to our _Role_
    1. _AmazonS3FullAccess_
    2. _CloudWatchLogFullAccess_
5. Under `Create Role` give the role a name, call it _TikTok-File-Upload-Role_ > Click `Create Role`

-------

### Lambda Function 

> ACTION: Lambda is a regional service, this when coupled with API Gateway (also a regional service) may drive a discussion about Advertisor density. This may not be an issue depending on processing time, but it may increase cost or upload time if there is tremendous geographic disperity btwn Region and Advertisors. 

1. Go to console, and select the Lambda Service
2. Go to `Create function` > `Author from Scratch`
3. Complete _Basic Information_ like the screenshot below: 

<p align: center>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/a03ee082-bb6e-4135-86d0-c2458298e722">
</p>

4. Click `Create Function`
5. We have 2 items on configuration that need to be modified: 
    1. Time-Out
    2. Memory

Both of these settings can be modified by clicking the `Configuration` > `General` > `Edit`

Modify the Basic Settings to look like this: 

<p align: center>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/d2c40f95-22f2-45eb-8818-ff0e91032eb9">
</p>

6. Click `Save`

> ACTION: We may not be able to use Lambda depending on file size. Estimated size is 1TB. We may need to either configure Multi-Part upload and we need to understand 1. Average file size and frequency to determine if solution can use lambda functions. 

7. The completed Lambda function configuration should look like this prior to adding the Upload logic. Before adding the logic we need to create the S3 bucket so we know what endpoint and payload will be received by the function. 

<p align: center>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/4a913a2f-44a9-4173-bfb6-3253434f96b7">
</p>

8. In the lambda function we will be implementing 3 files: 1. index.mjs 2. file-processing-service.js & 3. util.js. Create files and update file content according to the screen shots below.

#### index.mjs file 

<p>
<img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/4ff0198b-6087-4927-8b31-1a7a68383f72">
</p>

```js
const fileProcessingService = require('./file-processing-service')
const util = require('./util')
const fileUploadPath = require('/fileupload')

export const handler = async (event) => {
  console.log('Request Event ', event)
  let response
  
  switch(true){
    case event.httpMethod === 'POST' === event.path === fileUploadPath:
      response = await fileProcessingService.process(event.body)
      break
    default:
      response = util.buildResponse(404)
  }
  return response
};
```

#### file-processing-service.js

<p>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/eaa675c8-2786-4628-af8d-221c8a0e48c2">
</p>

```js
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const util = require('./util')
/*global Data*/
/*global s3Subfolder*/

const bucketName = 'tiktok-rawfile-upload-prototype'
const subFolder = 'data'

async function process(requestBody) {
    const fileName = requestBody.split('\r\n')[1].split(';')[2].split('=')[1].replace(/^"|"$/g, '').trim()
    let fileContent = requestBody.split('\r\n')[4].trim()
    // processing of the file content -- this example could include validations of data or admin process such as naming conventions, etc.
    fileContent += `\n\nProcess Timestamp: ${new Date().toISOString()}`;
    const params = {
        Bucket: bucketName,
        Key: `${s3Subfolder}/${fileName}`,
        Body: fileContent
    }
    await s3.putObject(params).promise()
    return util.buildResponse(200)
}

module.exports.process = process
```

#### utils.js 

<p>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/dc803780-6751-4cf8-8a13-b00d9f0d9544">
</p>

```js
function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

module.exports.buildResponse = buildResponse
```

9. Once all the files have been created, click `Deploy`. If all worked correctly you will see a screenshot similar to the following: 

<p>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/d9e7942b-7e10-4d00-966d-b483c4fec4e9">
</p>

--------

### S3 Bucket
1. Go to console, and select the S3 service
2. Click `Create Bucket`
3. Under `Create Bucket` > `General Configuration` provide a bucket name and select a region for deployment. The configuration for the prototype is as follows: 

<p align: "center">
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/ae447056-be1e-4c68-a14b-5a7e2e842b31">
</p>

> ACTION: Another question to TikTok is what is the configuration requirements for bucket creation. Will they have a particualar naming convention? Will they have a regional deployment requirement? 

4. Enable Versioning

<p align: center>
<img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/f34b89c9-207e-428c-9a8b-20f32560d078">
</p>

5. Enable Default Encryption

<p align: center>
<img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/88c3637c-dc27-410d-a8ce-91553d04f3a8">
</p>

> ACTION: Need to understand encryption requirements. How do we want to manage encryption and key management. If we utlize AWS Nitro we will need to utilize KMS. 

6. Click `Create Bucket`. Your completed bucket should look like the following: 

<p>
<img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/439830ac-8592-4680-be93-0b6ae6e16be3">
</p>

----------

### API Gateway

> ACTION: API Gateway is a regional service, so we will need to get an answer to where are the customer uploads coming from so we can invoke in a region closest to advertisor. 

1. Go to the console, and select the API Gateway service
2. Select `REST API` > `Build`
3. On the next screen, Under `Create New API` click `New API`
4. Under Settings you will need to provide 1. a name, 2. description & 3. endpoint type. Configure Settings to look as follows: 

<p>
<img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/a5e55fcf-e585-4701-81fb-776fb3d2cb70">
</p>

> ACTION: API Gateways can be 1. regional, 2. edge optimized or 3. private. If we are utilizing private we will need VPC endpoints configured. This is another configuration discussion that needs to be resolved. 

5.  Click `Actions` > `Create Resources` and configure the `New Child Resource` screen as follows and click `Create Resource`

<p>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/dad6c996-c5e9-4b19-a8e5-7236fe89cb09">
</p>

6. Click the resource you just created `/fileupload` > Click `Actions` > Click `Create Method` > Click `POST` and then configure the endpoint as follows: 

<p>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/3701a389-5417-4014-8fa9-1fd3cc516f30">
</p>

Click `Save` then a pop-up will appear click `Ok`

7. A completed endpoint set up will look as follows: 

<p>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/23e74cf5-1b5d-4b30-85c7-9c296418d962">
</p>


> ACTION: The API Gateway provides a mechanism for provisioning API Keys to secure endpoints. We need to decide or socialize with TikTok whether securing endpoints with an API token and providing a self-service mechanism for provisioning and reseting keys. 

8. Now you need to deploy your API. Click the `/` level of the resource > Click `Actions` > Click `Deploy API` > Set the `Deploy Stage` to `[New Stage]`. A final pop-up should appear configure as follows and click `Deploy`

<p>
<img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/631ab6c0-e39c-407e-9822-7303502e7488">
</p>

9. When you've completed the deployment process, the output should look like this. 

<p>
<img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/947b9c62-b810-4c86-8d67-7a10437db429">
</p>

> ACTION: We need to understand what our requirement for API access will be (aka Throttling). This may be an issue if there is a multi-part upload or if there are batch jobs that execute a series of retry attempts. This will also be a consideration if we decide to provide Dashboarding features. 

> ACTION: We need to understand what our requirement is for ACLs or Certs. 

> ACTION: There is a capability for CACHING. I don't see a use case for CACHE. We need to validate this will NOT be a requirement. 

--------

