# cinetie-backend

### Usage

#### Dependencies

First pull the code and navigate to the root `DIR` and run `npm install`

#### .env
set up an `.env` with the following varibles
```DEV_DATABASE_URL=
DATABASE_URL=
SECRET=
EMAIL_PASS=
EMAIL_API_KEY=
API_KEY=
EMAIL_USER=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FB_CLIENT_ID=
FB_CLIENT_SECRET=
DIALECT=
MAIL_USER=
MAIL_PASS=0 
```

#### Endpoints
home is /api/

##### + Auth

start by creating an account: POST request
 `/auth/signup`

REQUEST BODY:
```
{
    "firstName": "Jane",
    "lastName": "doe",
    "email": "jane@gmail.com",
    "password": "nAdia123",
    "plan": "Premium",
    "phoneNumber":"+250780964422",
    "isBilledAnnually":"true",
    "permissionLevel":2,
    "cityOfResidence":"kigali",
    "nationality":"Rwandan"
} 

```
RESPONSE:

```
{
  "statusCode": 201,
  "status": "success",
  "message": "Signed up successfully",
  "data": {
    "id": 3,
    "firstName": "Jane",
    "lastName": "doe",
    "email": "jane@gmail.com",
    "password": "$2b$10$bDXbI8pGB0D09H5ciH16qOvk7r7wAzGgiCsFe466SQjZRX0dXbFzG",
    "plan": "Premium",
    "phoneNumber": "+250780964422",
    "isBilledAnnually": true,
    "permissionLevel": 2,
    "cityOfResidence": "kigali",
    "nationality": "Rwandan",
    "isVerified": false,
    "updatedAt": "2019-11-16T20:42:27.805Z",
    "createdAt": "2019-11-16T20:42:27.805Z"
  }
}
```
2.Then proceed with the Account verification

REQUEST URL :

`/auth/verify?id=<Id>&&token=<access token>`

RESPONSE :

```
{
    "statusCode": 200,
    "status": "success",
    "message": "Verified successfully!",
    "data": [
        1
    ]
}

```
3.Proceed with Login : POST Request


NOTE: login will be disabled as long as the account is not verified

`/auth/login`

REQUEST BODY :

```
{
  "email": "jdoe@mailer.com",
  "password": "pass1234"
}

```
RESPONSE BODY :

```
{
    "statusCode": 200,
    "status": "success",
    "message": "Logged in successfully!",
    "data": "<access Token>"
}

```
NOTE: access token is used with every request outside the auth module

4.Update account

REQUEST: PUT

`/auth/<id>?auth_token=`

REQUEST BODY :

```
{
	"firstName":"james",
	"lastName":"Carick"
}

```
NOTE : any can be updated; need just to be put in the object

RESPONSE

```
{
    "statusCode": 200,
    "status": "success",
    "message": "updated successfully",
    "data": [
        1
    ]
}

```
5. delete account

REQUEST : DELETE

`/auth/delete_acc/?id=<id>&auth_token=<token>`

RESPONSE :

```
{
    "statusCode": 200,
    "status": "success",
    "message": "deleted successfully",
    "data": 1
}

```

6.Google Login

REQUEST : GET

`/auth/google`

7.facebook login

REQUEST : GET

`/auth/facebook`

8.Forgot password

REQUEST : POST

`/auth/forgot_password`

BODY:

```
{
	"email": "jdoe@mailer.com"
}

```

RESPONSE :

```
{
    "status": 200,
    "message": "Reset password link sent successfully!",
    "data": null
}

```
9. Reset password

REQUEST :

`/auth/reset_password/?id=<id>&&token=`

RESPONSE :

```
{
    "status": 200,
    "message": "Password reset successfully!",
    "data": null
}

```



##### + Profiles

1. creating profiles for a particular account 

`/profiles/new?auth_token=XXXXXXXXXXXXXXXXXXXXX`

REQUEST BODY : POST

```
{
	"name":"XXXX",
	"email":"jdoe@mailer.com"
}

```

RESPONSE BODY :

```
{
    "statusCode": 201,
    "status": "success",
    "message": "Profile successfully added!",
    "data": {
        "id": XXX,
        "name": "XXX",
        "email": "jdoe@mailer.com",
        "updatedAt": "2019-10-12T07:33:13.777Z",
        "createdAt": "2019-10-12T07:33:13.777Z"
    }
}

```

2 . Getting a particular profile

`/profiles/<id>?auth_token=`

RESPONSE BODY : GET

```
{
    "statusCode": 200,
    "status": "success",
    "message": "Profile successfully retrieved!",
    "data": {
        "id": XXXX,
        "name": XXX,
        "email": "jdoe@gmail.com",
        "createdAt": "2019-09-28T20:10:14.000Z",
        "updatedAt": "2019-09-28T20:10:14.000Z"
    }
}

```
3. Getting all profiles

`/profiles/?auth_token=`

REPONSE BODY : GET

```
{
    "status": 200,
    "message": "Profiles successfully retrieved!",
    "data": [
        {
            "id": 1,
            "name": "xxxx",
            "email": "jdoe@mailer.com",
            "createdAt": "2019-09-28T20:10:14.000Z",
            "updatedAt": "2019-09-28T20:10:14.000Z"
        },
        {
            "id": 2,
            "name": "xxx",
            "email": "jdoe@mailer.com",
            "createdAt": "2019-10-12T07:33:13.000Z",
            "updatedAt": "2019-10-12T07:33:13.000Z"
        }
    ]
}

```

4. Updating a profile : PUT

`/profiles/<id>?auth_token=`

RESPONSE BODY 

```
{
    "statusCode": 200,
    "status": "success",
    "message": "Profile updated successfully"
}

```

5. Delete profile : DELETE

`/profiles/<id>?auth_token=` 

```
{
    "status": 200,
    "message": "Profile successfully deleted!",
    "data": 1
}

```



##### +Plans

1. start by defining  plan

`/profiles/new?auth_token=`

REQUEST BODY : POST

```
{
	  "type": "xxxx",
    "hasHd": <boolean>,
    "hasUltraHd": <boolean>,
    "numberOfScreens": <integer>,
    "monthlyPrice": <float>,
    "yearlyPrice": <float>
}

```

RESPONSE BODY 

```
{
    "statusCode": 201,
    "status": "success",
    "message": "Plan successfully added!",
    "data": {
        "id": XX,  
	      "type": "xxxx",
        "hasHd": <boolean>,
        "hasUltraHd": <boolean>,
        "numberOfScreens": <integer>,
        "monthlyPrice": <float>,
        "yearlyPrice": <float>
        "updatedAt": "2019-10-12T07:54:22.979Z",
        "createdAt": "2019-10-12T07:54:22.979Z"
    }
}

```

2.Getting a particular plan : GET

`/plan/<name>`

RESPONSE BODY:

```
{
    "status": 200,
    "message": "Plan successfully retrieved!",
    "data": {
        "id": XX,  
	      "type": "xxxx",
        "hasHd": <boolean>,
        "hasUltraHd": <boolean>,
        "numberOfScreens": <integer>,
        "monthlyPrice": <float>,
        "yearlyPrice": <float>
        "updatedAt": "2019-10-12T07:54:22.979Z",
        "createdAt": "2019-10-12T07:54:22.979Z"
    }
}

```
3. Getting all profiles : GET

`/plan`

RESPONSE BODY:

```
{
    "status": 200,
    "message": "Plans successfully retrieved!",
    "data": [
        {
         "id": XX,  
	      "type": "xxxx",
        "hasHd": <boolean>,
        "hasUltraHd": <boolean>,
        "numberOfScreens": <integer>,
        "monthlyPrice": <float>,
        "yearlyPrice": <float>
        "updatedAt": "2019-10-12T07:54:22.979Z",
        "createdAt": "2019-10-12T07:54:22.979Z"
        },
        {
        "id": XX,  
	      "type": "xxxx",
        "hasHd": <boolean>,
        "hasUltraHd": <boolean>,
        "numberOfScreens": <integer>,
        "monthlyPrice": <float>,
        "yearlyPrice": <float>
        "updatedAt": "2019-10-12T07:54:22.979Z",
        "createdAt": "2019-10-12T07:54:22.979Z"
        }
    ]
}

```
4.update a plan

REQUEST : PUT

`/plan/name?auth_token=`

BODY:

```
{
    "hasHd": <boolean>,
    "hasUltraHd": <boolean>,
    "numberOfScreens":< integer>,
    "monthlyPrice": <float>,
    "yearlyPrice": <float>
}

```

RESPONSE :

```
{
    "status": 200,
    "message": "Plan successfully updated!",
    "data": null
}

```
5. delete plan

REQUEST: DELETE

`/plan/name?auth_token=`

RESPONSE :

```
{
    "status": 200,
    "message": "Plan successfully deleted!",
    "data": 1
}

```
