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

<p align: center>
    <img width="350" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/d2c40f95-22f2-45eb-8818-ff0e91032eb9">
</p>

> ACTION: We may not be able to use Lambda depending on file size. Estimated size is 1TB. We may need to either configure Multi-Part upload and we need to understand 1. Average file size and frequency to determine if solution can use lambda functions. 

--------