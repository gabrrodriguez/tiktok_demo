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
3. Under _Basic Information_ proivde the Lambda a name > (e.g. _file-upload-system-backend_)
4. Under _Basic Information_ select the Runtimes as Node.js 18x
5. Under _Basic Information_ proivde the Architecture as x86_64
6. Under _Basic Information_ select the `Change the default exection role` to select the role created in 

<p align: center>
    <img width="1565" alt="image" src="https://github.com/gabrrodriguez/tiktok_demo/assets/126508932/b4f18433-d442-4253-9d61-19cf15387a36">
</p>




--------