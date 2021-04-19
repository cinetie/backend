# Description

API documentation for CINETIE main api
 [![GitHub CI](https://github.com/cinetie/backend/actions/workflows/run-test.yml/badge.svg)](https://github.com/cinetie/backend/actions/workflows/run-test.yml)
 ![BUILD_MASTER](https://codefactory-eu-west-1-prod-default-build-badges.s3-eu-west-1.amazonaws.com/passing.svg)

## Installation

> npm install
> touch .env

```env

DEV_DATABASE_URL=
DEV_DATABASE_URL_=
PROD_DATABASE_URL=
TEST_DATABASE_URL=
SECRET=
JWT_EXPIRATION=
EMAIL_USER=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FB_CLIENT_ID=
FB_CLIENT_SECRET=
DIALECT=
TRENDING_WATCH_COUNT=
ADMIN_USER=
ADMIN_PASS=
SMTP_HOST=
SMTP_PORT=
SENDGRID_USER=
SENDGRID_PASS=
HOST=
DAX_PAY_URL=
MIN_CASHOUT=
DB_URL=
IP_STACK_ACCESS_TOKEN=
ClOUDINARY_URI=
AWS_ID=
AWS_REGION=
AWS_SECRET=
STAGING_DATABASE_URL=
CA_LOCATION=
LOGGLY_TOKEN=
HOST_USER_SERVICE=
ADMIN_TEST_TOKEN=
USER_TEST_TOKEN=
RAVE_PRODUCTION=
AWS_S3_ROLE_ARN=
AWS_UPLOAD_ACCESS_KEY=
AWS_UPLOAD_ID=
RAVE_PUBLIC=
RAVE_SECRET=
PAY_HOST=
NODE_ENV=
PORT=
FREQUENCY_CRON=
TEMP_BUCKET_SERIES=
TEMP_BUCKET_MOVIE=
PERMANENT_BUCKET_SERIES=
PERMANENT_BUCKET_MOVIE=

```

## Quick find

### Earnings

- [Calculate earnings per user](#1-calculate-earnings-post-request)

### Videos

- [Add watch count](#2-add-watch-count-post-request)

- [Update video](#17-update-video-put-request)

- [Get single video](#18-get-single-video-get-request)

### Transactions

- [Get Rave standard link](#3-get-rave-standard-link-get-request)

- [Cancel subscription](#13-cancel-subscription-put-request)

- [Reactivate subscription](#14-reactivate-subscription-put-request)

### Users

- [Signup](#4-signup-users-post-request)

- [login](#5-login-users-post-request)

### Trailers

- [Add new trailer](#6-add-new-trailer-post-request)

- [Get trailers](#9-get-trailers-get-request)

- [Get trailer upload link](#10-get-upload-link-get-request)

- [Get signed urls for temporay urls](#11-get-signed-urls-for-temporay-urls-get-request)

### Temp videos

- [Add a temporary video](#7-add-temp-video-post-request)

- [Approve a temporary video](#8-approve-temp-video-post-request)

- [Update temporary video](#16-update-temporary-video-put-request)

### Series

- [Get a full season](#12-get-a-full-season-get-request)

## Endpoints

### 1. Calculate earnings: POST Request

Endpoint:

```text
/earnings/calculate-per-user
```

Headers:

```json
{
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "paymentMethod": "card" | "mobile money" | "spenn"
}
```

Response:

```json
{
    "status": 200,
    "message": "Success transaction finished",
    "data": true
}
```

### 2. Add watch count: POST Request

Endpoint:

```text
/video/watch-session?id=326f4788-aef8-4fe9-a08a-4cafbd2a1956
```

Headers:

```json
{
  "Authorization": `Bearer ${token}`,
  "ip": `<user_ip>`,
  "Content-Type": "application/json"
}
```

Body:

#### NONE

Response:

```json

{
    "statusCode": 201,
    "status": "success",
    "message": "Registered the watch session",
    "data": {
        "status": "done"
    }
}

```

### 3. Get rave standard link: GET Request

Endpoint:

```text
/trans/rave-standard
```

Headers:

```json
{
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json"
}
```

Body:

#### NONE

Repsonse:

```json
{
    "statusCode": 201,
    "status": "success",
    "message": "Link generated",
    "data": {
        "link": "https://checkout.flutterwave.com/v3/hosted/pay/6bb2b8983df00a0875e9"
    }
}
```

### 4. Signup users: POST Request

Endpoint:

```text
/auth/signup
```

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
    "email": "hafajo1128w6@soowz.com",
    "password": "nAdia123"
}
```

Response:

```json
{
    "statusCode": 201,
    "status": "success",
    "message": "Signed up successfully",
    "data": {
        "id": 8,
        "firstName": "Mugisha",
        "lastName": "Alain a",
        "email": "hafajo1128w6@soowz.com",
        "password": "$2b$10$e5Yy2HkzD4.zaaAArAEMWeUytqoS5lAelJMShokwgcxlkWTqycj.2",
        "isVerified": false,
        "plan": "Setup",
        "permissionLevel": -1,
        "isOnTrial": false,
        "isOnExtension": false,
        "isBilledAnnually": false,
        "updatedAt": "2020-11-01T04:57:28.222Z",
        "createdAt": "2020-11-01T04:57:28.222Z"
    }
}

```

### 5. Login users: POST Request

Endpoint:

```text
/auth/login
```

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
 "email":"lowiwo5426@jah8.com",
  "password": "kamunikwi"
}

```

Response:

```json
{
    "statusCode": 200,
    "status": "success",
    "message": "Logged in successfully!",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Imxvd2l3bzU0MjZAamFoOC5jb20iLCJpYXQiOjE2MDQyMDY3ODJ9.Lgs7mU3zThqoyO759rIc-II9L8w_tFDQbdlkWAXycGs"
}
```

### 6. Add new trailer: POST Request

Endpoint:

```text
/trailer/new
```

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //admin token
}
```

Body:

```json
{
    "trailer": "94856593-c138-4547-b7bb-f7002fca64f8.mp4",
    "videoId": "ba27823d-41a2-471e-8d12-483cbb8eeb98"
}
```

Response:

```json
{
    "statusCode": 201,
    "status": "success",
    "message": "successfully saved the trailer",
    "data": {
        "id": 1,
        "videoId": "ba27823d-41a2-471e-8d12-483cbb8eeb98",
        "trailerLink": "94856593-c138-4547-b7bb-f7002fca64f8.mp4",
        "updatedAt": "2020-11-03T10:02:41.602Z",
        "createdAt": "2020-11-03T10:02:41.602Z"
    }
}

```

### 7. Add temp video: POST Request

Endpoint:

```text
/temp/new
```

Headers:

```json
{
  "cpid": `<content provider id>`,
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //admin token
}

```

Body:

```json
{
    "videoName": "You never know ",
    "videoCast": "Gisa  ally D'akim , Ntwari Aimable , Ingabire claudine ,  Ndungutse makanda Dady  , sangano joyeuse ",
    "videoSynopsis": "Brave Tomas is young resilient and hardworking man, well educated, smart and intelligent. , he applied for job many times but did not get a chance to be hired.",
    "category": "Drama",
    "landscape": "6e696b42-914c-4bcc-81ab-3b742cca2929.jpg",
    "nameTag": "db7730cf-8cda-452b-a556-c0941142d6c6.png",
    "portrait": "2d0a3e40-e005-4480-85a8-5ac52b13bd32.jpg",
    "type": "serie",
    "rate": "Everyone",
    "video": null,
    "resCountries": "[]"
}
```

Response:

```json
{
    "statusCode": 201,
    "status": "success",
    "message": "video uploaded successfully",
    "data": {
        "status": "upload success"
    }
}
```

### 8. Approve temp video: POST Request

Endpoint:

```text
/video/new?id=<id>
```

***this is not the video id but the id property in the video object not the videoId***

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //admin token
}
```

Body:

***NONE***

Response:

```json
{
    "statusCode": 201,
    "status": "success",
    "message": "Video approved",
    "data": [
        1
    ]
}
```

### 9. Get trailers: GET Request

Endpoint:

```text
/trailer/sort/video?id=ba27823d-41a2-471e-8d12-483cbb8eeb98
```

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //admin token
}
```

Body:

***NONE***

Response:

```json

{
    "statusCode": 200,
    "status": "success",
    "message": "Found",
    "data": [
        {
            "id": 1,
            "videoId": "ba27823d-41a2-471e-8d12-483cbb8eeb98",
            "trailerLink": "https://cinetie-trailers.s3.us-east-2.amazonaws.com/94856593-c138-4547-b7bb-f7002fca64f8.mp4",
            "createdAt": "2020-11-03T10:02:41.000Z",
            "updatedAt": "2020-11-03T10:02:41.000Z"
        }
    ]
}
```

### 10. Get upload link: GET Request

Endpoint:

```text
/trailer/upload-link?extension=mp4
```

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //admin token
}
```

Body:

***NONE***

Response:

```json
{
    "statusCode": 201,
    "status": "success",
    "message": "Upload link created",
    "data": {
        "url": "https://cinetie-trailers.s3.us-east-2.amazonaws.com/ce316bd8-72ba-4a89-bf6f-d7233598cf36.mp4?Content-Type=video%2F%2A&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSWY74DVRYMLE344%2F20201103%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T102538Z&X-Amz-Expires=21600&X-Amz-Signature=01a60afa17e5e00d26e41aae90369dbcbfc6d81a298f7e253a6cf9698fffc771&X-Amz-SignedHeaders=host",
        "Key": "ce316bd8-72ba-4a89-bf6f-d7233598cf36.mp4"
    }
}
```

### 11. Get signed urls for temporay urls: GET Request

Endpoint:

```text
/temp/series/signed-url?extension=mp4
```

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //admin token
}
```

Body:

***NONE***

Response:

```json
{
    "statusCode": 200,
    "status": "success",
    "message": "Temporary urls",
    "data": {
        "thumb": {
            "url": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/1fe6d4f9-4946-4b46-bf0e-40e0e5e14086.jpg?Content-Type=image%2F%2A&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSWY74DVRYMLE344%2F20201103%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T103932Z&X-Amz-Expires=21600&X-Amz-Signature=34f488f2d0f295c4ecb259e8aba2cb97f9ac2d439e3a2092776ccd483afc19dc&X-Amz-SignedHeaders=host",
            "Key": "1fe6d4f9-4946-4b46-bf0e-40e0e5e14086.jpg"
        },
        "video": {
            "url": "https://cinetie-temp-series.s3.us-east-2.amazonaws.com/6510f578-36cb-4a29-a74c-803eb4fac0af.mp4?Content-Type=video%2F%2A&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSWY74DVRYMLE344%2F20201103%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T103932Z&X-Amz-Expires=21600&X-Amz-Signature=c6d39709511641dd6efe6b36b8e4836eab1b3fbb81ed93302e75914ed5cfb550&X-Amz-SignedHeaders=host",
            "Key": "6510f578-36cb-4a29-a74c-803eb4fac0af.mp4"
        }
    }
}
```

### 12. Get a full season GET Request

Endpoint

```text
/series/single/season?s=<season number>&id=<videoId>&limit=<don't exceed>&offset=<skip>
ex: /series/single/season?s=1&id=ab8d5899-5ca6-40dc-95d9-ce15587a0373&limit=10&offset=0
```

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //admin token
}
```

Body:

***NONE***

Response:

```json
{
    "statusCode": 200,
    "status": "success",
    "message": "Retrieved successfully",
    "data": [
        {
            "id": 2,
            "episode": "f12fc881-2e5d-422e-9e72-2a1d213a19b7.mp4",
            "season": 1,
            "episodeName": "the World cup project - Brazil ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/33d9d5d9-9d34-418c-b9b0-c158ca5effda.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from Brazil ",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 1,
            "createdAt": "2020-09-03T15:14:34.000Z",
            "updatedAt": "2020-09-03T15:16:08.000Z"
        },
        {
            "id": 3,
            "episode": "d8eeb219-31bf-4b46-a52f-8cf3bc4159f4.mp4",
            "season": 1,
            "episodeName": "the World cup project - Australia ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/319a70e1-9206-4906-92fe-c2516499c27e.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from Australia ",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 2,
            "createdAt": "2020-09-03T15:18:14.000Z",
            "updatedAt": "2020-09-03T15:18:29.000Z"
        },
        {
            "id": 4,
            "episode": "caa9868a-4041-4aae-881d-29a96065568a.mp4",
            "season": 1,
            "episodeName": "the World cup project - Colombia ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/9e51d924-2920-40b2-bcc0-c991276c1a76.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  Colombia ",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 3,
            "createdAt": "2020-09-03T15:22:30.000Z",
            "updatedAt": "2020-09-03T15:22:42.000Z"
        },
        {
            "id": 5,
            "episode": "c4cb4741-6e84-425c-a4ab-4701f60ca41e.mp4",
            "season": 1,
            "episodeName": "the World cup project - England",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/01300dda-4daf-4737-a388-efe2e5f8726b.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  England ",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 4,
            "createdAt": "2020-09-03T15:25:57.000Z",
            "updatedAt": "2020-09-03T15:30:42.000Z"
        },
        {
            "id": 6,
            "episode": "a348e9b2-5744-4bb6-95e5-76a1cace54a6.mp4",
            "season": 1,
            "episodeName": "the World cup project - Haiti ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/ce7c5831-3bc0-486e-b43d-f83df6e146a3.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  Haiti",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 5,
            "createdAt": "2020-09-03T15:28:34.000Z",
            "updatedAt": "2020-09-03T15:30:41.000Z"
        },
        {
            "id": 7,
            "episode": "def9ccf9-c944-4c61-b154-3ee2a811194b.mp4",
            "season": 1,
            "episodeName": "the World cup project - India ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/ebbe0670-da54-4551-9ef5-bb1eeb9423f7.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  India",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 6,
            "createdAt": "2020-09-03T15:30:40.000Z",
            "updatedAt": "2020-09-03T15:30:53.000Z"
        },
        {
            "id": 8,
            "episode": "9ce8ad03-e48d-4823-bc2f-650a9ee50de1.mp4",
            "season": 1,
            "episodeName": "the World cup project - Israel & Palestine ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/ac64069c-1af3-4ec0-b193-e8d736349bdc.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  Israel and Palestine ",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 7,
            "createdAt": "2020-09-03T15:33:16.000Z",
            "updatedAt": "2020-09-04T17:07:53.000Z"
        },
        {
            "id": 9,
            "episode": "92bedec2-1e03-4f18-bcdb-ce23675d6054.mp4",
            "season": 1,
            "episodeName": "the World cup project - Liberia  ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/4f464e90-5b7e-43b0-b663-9e306b42836e.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  Liberia",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 8,
            "createdAt": "2020-09-03T15:36:14.000Z",
            "updatedAt": "2020-09-04T17:07:53.000Z"
        },
        {
            "id": 10,
            "episode": "fa8ca8e7-dbd6-4037-8af9-4f7d02c2c033.mp4",
            "season": 1,
            "episodeName": "the World cup project - Sierra Leone ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/20e78ce5-5acd-4f60-97e3-dc9b18bb8c4e.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  Sierra Leone",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 9,
            "createdAt": "2020-09-03T15:39:09.000Z",
            "updatedAt": "2020-09-04T17:07:51.000Z"
        },
        {
            "id": 11,
            "episode": "e1931d31-6cb6-4e61-bd2b-63da176bd94f.mp4",
            "season": 1,
            "episodeName": "the World cup project - USA  ",
            "videoId": "ab8d5899-5ca6-40dc-95d9-ce15587a0373",
            "thumbNailUrl": "https://cinetie-thumbnails.s3.us-east-2.amazonaws.com/da1512a0-39d7-4739-a56b-f14d0d1b34a0.jpg",
            "suspensionState": false,
            "synopsis": "a World cup Project perspective from  USA ",
            "clientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
            "episodeNumber": 10,
            "createdAt": "2020-09-03T15:41:22.000Z",
            "updatedAt": "2020-09-04T17:07:43.000Z"
        }
    ]
}
```

### 13. Cancel subscription: PUT Request

Endpoint:

```text
/trans/cancel-subscription
```

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //users token
}
```

Body:

***NONE***

Response:

```json

{
    "statusCode": 201,
    "status": "success",
    "message": "Subscription Canceled"
}
```

### 14. Reactivate subscription: PUT Request

Endpoint:

```text
/trans/reactivate-subscription
```

Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" //users token
}
```

Body:

***NONE***

Response:

```json

{
    "statusCode": 201,
    "status": "success",
    "message": "Subscription activated"
}
```

### 16. Update temporary video: PUT Request

Endpoint:

```text
/temp/update?id=<id>
```

Headers:

```json
{
    "Authorization": "Bearer <Admin token>",
    "Content-Type": "application/json"
}
```

Body:

```json
{
    "property": "value"
}

```

Response:

```json
{
    "statusCode": 200,
    "status": "success",
    "message": "Video updated",
    "data": [
        1
    ]
}
```

### 17. Update  video: PUT Request

Endpoint:

```text
/video?id=<videoId>
```

Headers:

```json
{
    "Authorization": "Bearer <Admin token>",
    "Content-Type": "application/json"
}
```

Body:

```json
{
    "property": "value"
}

```

Response:

```json
{
    "statusCode": 200,
    "status": "success",
    "message": "Video updated",
    "data": [
        1
    ]
}
```

### 18. Get single video: GET Request

Endpoint

```text
/video/unique?ip=&id=e52e3b69-1015-46d0-b1fb-dc504e0eeaf5
```

Headers:

```json
{
    "Authorization": "Bearer <User token>",
    "Content-Type": "application/json"
}
```

Body:
**NONE**

Response:

```json
{
    "statusCode": 200,
    "status": "success",
    "message": "videos Found",
    "data": {
        "id": 81,
        "videoLink": "https://d1n93qtmcsa1om.cloudfront.net/4658f065-86cc-4ab1-aeaa-71d8fabaec26/dash/f8f9027d-d730-4407-818f-60c71f31edd1.mpd",
        "videoKey": "f8f9027d-d730-4407-818f-60c71f31edd1.mp4",
        "videoId": "e52e3b69-1015-46d0-b1fb-dc504e0eeaf5",
        "videoName": "test 43",
        "videoCast": "rgrtg",
        "videoSynopsis": "ewfefer",
        "videoWatchCount": null,
        "videoThumbnailLink": "c2a888c3-c220-487b-8285-8b5e35ee9c41.jpg",
        "videoIdVimeo": "0000",
        "videoClientId": "67b6c3a8-884f-48af-8e8f-1a60b15824de",
        "videoSuspensionState": 0,
        "creationTime": 1608559176667,
        "category": "Short-Film",
        "featureType": 0,
        "isFeatured": false,
        "tallThumbNailLink": "29222b5b-7d3b-4d26-897c-fd2cea89b517.jpg",
        "nameTagThumbNailLink": "161cdab5-7efb-4cc5-9257-3ed370f1bf5a.png",
        "resCountries": "Antarctica,Bouvet Island,Heard Island and McDonald Islands",
        "type": "movie",
        "rate": "Everyone"
    }
}
```



### 18. Get All Sales: GET Request

Endpoint

```text
/admin/sales/all
```

Headers:

```json
{
    "Authorization": "Bearer <User token>",
    "Content-Type": "application/json"
}
```

Body:
**NONE**

Response:

```json
{
    "status": 200,
    "message": "Earnings found ",
    "data": {
        "result": {
            "2020": {
                "11": {
                    "sum": 3
                },
                "12": {
                    "sum": 35.699999999999974
                },
                "sumYear": 38.699999999999974
            },
            "2021": {
                "01": {
                    "sum": 33128.1
                },
                "sumYear": 33128.1
            },
            "sumTotal": 33166.799999999996
        }
    }
}
```
