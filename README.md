# Post app MERN Project

## Project - Post Application

### Project Link ==> https://threedshopmernproject.onrender.com

### Overview - only login user can create, delete, update and read post.

## FEATURE I - User

### Models

- User Model

```yaml
{
  name: { string, mandatory },
  email: { string, mandatory, valid email, unique },
  password: { string, mandatory, valid password },
  createdAt: { timestamp },
  updatedAt: { timestamp },
}
```

## User APIs

### POST /register

- Create a user document from request body.
- Save password in encrypted format. (use bcrypt-js)
- **Response format**

```yaml
{
  "message": "User registration successfull",
  "data":
    {
      "name": "bruce",
      "email": "ash@gmail.com",
      "_id": "643c2495e44153efbabecb8f",
      "createdAt": "2023-04-16T16:38:45.110Z",
      "updatedAt": "2023-04-16T16:38:45.110Z",
    },
}
```

### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
  > **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- **Response format**

```yaml
{
  "message": "Login Success",
  "data":
    {
      "_id": "6433e4e016a27dfe09b9337f",
      "name": "bruce",
      "email": "batman@gmail.com",
      "createdAt": "2023-04-10T10:28:48.448Z",
      "updatedAt": "2023-04-11T13:15:56.868Z",
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMzZTRlMDE2YTI3ZGZlMDliOTMzN2YiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODE1Mzk3NjYsImV4cCI6MTY4MTYyNjE2Nn0.6y9aKeZMKtRrsqLW9v-1T6IlkcDMaybTC3D-fXgyj5M",
}
```

## FEATTURE II - Posts

### Models

- Post Model

```yaml
{
  {
    title: { type: String, require: true, lowercase: true },
    description: { type: String, require: true },
    imgURL: { type: String, require: true },
  },
  { timestamps: true },
}
```

## Posts API (authentication required / only admin can create, update and delete file)

### POST /posts

- Create a post document from request body.
- Upload image to S3 bucket and save image public url in document.
- **Response format**

```yaml
{
  "message": "file Created successfully",
  "data":
    {
      "title": "modern livingroom 2",
      "description": "3ds max vray",
      "user":"ObjectID
      "imgURL": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
      "_id": "6437ee55be7216124fe0c425",
      "createdAt": "2023-04-13T11:58:13.564Z",
      "updatedAt": "2023-04-13T11:58:13.564Z",
    },
}
```

### GET /File

- Returns all posts in the collection..

- **Response format**

```yaml

{
    "data": [
        {
            "_id": "6431916c09569017e98eba0a",
            "title": "Modern LivingRoom 2",
            "description": "3ds max vray",
            "imgURL": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
            "createdAt": "2023-04-08T16:08:12.085Z",
            "updatedAt": "2023-04-08T16:08:12.085Z",
            "__v": 0
        },
        {
            "_id": "643acb615d695ad86ee1956d",
            "title": "413 living room 3d max interior scene",
            "description": "Please comment if you found the link was error. 3dsMax + obj (Vray) + Corona Modern Low poly. More materials you can find in the Material Editor. (Note for beginners: If you need color variations or material variations, please do not import the model in the Slate Material Editor. use Compact Material Editor)",
            "imgURL": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/413-Living-Room-3d-Max-Interior-Scene-1024x914.jpg%20%281%29.webp"
            "createdAt": "2023-04-15T16:05:53.942Z",
            "updatedAt": "2023-04-15T16:05:53.942Z",
            "__v": 0
        },

}

```

### GET /post/:postId

- Returns posts details by postId id
- **Response format**

  ```yaml
  {
    "data":
      {
        "_id": "6431916c09569017e98eba0a",
        "title": "Modern LivingRoom 2",
        "description": "3ds max vray",
        "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
        "createdAt": "2023-04-08T16:08:12.085Z",
        "updatedAt": "2023-04-08T16:08:12.085Z",
        "__v": 0,
      },
  }
  ```

### PUT /post/:postId

- Updates a file by changing at least one or all fields
- Check if the fileId exists (must have isDeleted false and is present in collection).
- **Response format**

```yaml
{
  "message": "post Updated successfully",
  "data":
    {
      "title": "modern livingroom 2",
      "description": "3ds max vray",
      "fileSize": "200",
      "prize": 4000,
      "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
      "isDeleted": false,
      "_id": "6437ee55be7216124fe0c425",
      "createdAt": "2023-04-13T11:58:13.564Z",
      "updatedAt": "2023-04-13T11:58:13.564Z",
    },
}
```

### DELETE /post/:postId

- Deletes a post by postId if it's not already deleted
- **Response format**

```yaml
{ "message": "post Deleted successfully" }
```
