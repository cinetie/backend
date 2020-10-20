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
