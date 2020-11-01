# Description

API documentation for CINETIE main api

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

```

## Quick find

### Earnings

- [Calculate earnings per user](#1-calculate-earnings-post-request)

### Videos

- [Add watch count](#2-add-watch-count-post-request)

### Transactions

- [Get Rave standard link](#3-get-rave-standard-link-get-request)

### Users

- [Signup](#4-signup-users-post-request)

- [login](#5-login-users-post-request)

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
    "firstName": "Mugisha",
    "lastName": "Alain a",
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
