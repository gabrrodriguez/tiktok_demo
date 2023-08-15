# TikTok Uploader

# Architecture

<p align: center>
    <img width="1015" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/fbc00596-f7da-49e8-86d0-25a3a01bcd56">
</p>

----------

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

--------

### S3 Bucket
1. Go to console, and select the S3 service
2. Click `Create Bucket`
3. Under `Create Bucket` > `General Configuration` provide a bucket name and select a region for deployment. The configuration for the prototype is as follows: 

<p align: center>
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


