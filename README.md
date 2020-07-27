# Project: cinetie
## Description: # Introduction
Backend API for cinetie

# Overview
Normal API with assets stored on cloudinary. all secured Routes are secured with Oauth

# Authentication

Every protected route is accesible via a unique access token

# Error Codes
422: unprocessable entity
503: server error
200: data found
201: data created
403: Illegal access
404: resource unavailable

# Rate limit
No limit
# 📁 Collection: payments 


## End-point: Cancel paypal subscriptions
### Description: 
Method: GET
>```
>{{local}}/trans/paypal/cancel/agreement
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImphbmV0aGRvZUBnbWFpbC5jb20iLCJpYXQiOjE1Nzg4NTQ4MzB9.xSIf64lR_fNdtsK1PICf7iM-xxR3xVAw5xd1UY3c19U|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: cp checkout
### Description: 
Method: PUT
>```
>{{local}}/cp/trans/checkout
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODY5Nzk2NTN9.bDCDrZ69VhQmnc1OySrLeX57u6hm_Lxl2PvOO8nWDV8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: approve checkout
### Description: 
Method: PUT
>```
>{{local}}/cp/trans/approve?id=1
>```
### Query Params

|Param|value|
|---|---|
|id|1|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjE5MDd9.qR5N1uUG_F9E0spZRfvbLZd84CslBApI9tETQYZFWY8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all transactions
### Description: 
Method: GET
>```
>{{local}}/cp/trans/all
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjQ1ODl9.UNZGfHVtj2J0pIlFhCeulb9YQ6d-YUIa2KRGeWeum4E|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: dax-momo
### Description: 
Method: GET
>```
>
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Verify OTP
### Description: 
Method: POST
>```
>{{local}}/auth/otp-verify
>```
### Body (**raw**)

```json
{
    "flw_ref": "FLW-MOCK-ab320bc7b439009effa458e281caf465",
    "authorization": {
        "mode": "otp-verify",
        "otp": "12345"
    }
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk0NTg2ODQ0fQ.ogyWG3mEoKd6KZOqIGKkcX5qhG3OFXCM3iV6udJGZPE|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Charge tokenized
### Description: 
Method: POST
>```
>https://ravesandboxapi.flutterwave.com/v3/tokenized-charges
>```
### Body (**raw**)

```json
{
    "token":"flw-t1nf-add25a7dddf59d55f0c512e36a271b60-m03k",
    "currency": "RWF",
    "country": "RW",
    "amount": 210,
    "email": "alainchristian87@gmail.com",
    "first_name": "Yemi",
    "last_name": "Desola",
    "ip": "123.876.0997.9",
    "narration": "Sample tokenized charge",
    "tx_ref": "tokenized-c-001"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|FLWSECK_TEST-9c070d3e072335da18b5988f4c0701dd-X|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Users 


## End-point: signup
### Description: 
Method: POST
>```
>{{local}}/auth/signup
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "firstName": "Mugisha",
    "lastName": "Alain",
    "email": "tiyova4650@entrastd.com",
    "password": "nAdia123",
    "nationality": "Rwandan",
    "cityOfResidence": "Muhima"
} 
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Login
### Description: 
Method: POST
>```
>{{local}}/auth/login
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"email":"tiyova4650@entrastd.com",
    "password": "nAdia123"
}

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Verify Email
### Description: 
Method: GET
>```
>http://localhost:5000/auth/verify/?id=44&token=eyJhbGciOiJIUzI1NiJ9.d2lsbHNtaXRoQGdtYWlsLmNvbQ.XzC9DzFoKJOLWIrNFT2-dvhyVtzm3oHhWHOgWQKeD4U
>```
### Query Params

|Param|value|
|---|---|
|id|44|
|token|eyJhbGciOiJIUzI1NiJ9.d2lsbHNtaXRoQGdtYWlsLmNvbQ.XzC9DzFoKJOLWIrNFT2-dvhyVtzm3oHhWHOgWQKeD4U|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: getParticularUser
### Description: 
Method: GET
>```
>{{local}}/auth/particular
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiaWF0IjoxNTg2OTAzODc0fQ.5NVwX0ftSIxVTnYrqciRF3GxZJBen_T1wE5VcAxQukQ|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: signup-cont
### Description: 
Method: PUT
>```
>{{local}}/auth/signup/cont
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"paymentMethod": 2
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk0NTg2ODQ0fQ.ogyWG3mEoKd6KZOqIGKkcX5qhG3OFXCM3iV6udJGZPE|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Login Admin
### Description: 
Method: GET
>```
>
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update user details
### Description: 
Method: PUT
>```
>{{local}}/auth/update
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"isBilledAnnually": false,
	"plan": "Basic",
	"phoneNumber": "0780964422"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk0NTg2ODQ0fQ.ogyWG3mEoKd6KZOqIGKkcX5qhG3OFXCM3iV6udJGZPE|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Logout
### Description: 
Method: PUT
>```
>{{local}}/auth/logout
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiaWF0IjoxNTg2ODk4NTkwfQ.jlJ58g3GuFA9U72-OME0jJydn4HR7JFjhCsBUnhdOXc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: forgot password
### Description: 
Method: POST
>```
>{{local}}/auth/forgot-password
>```
### Body (**raw**)

```json
{
	"email":"mugishaalainc@gmail.com"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: activate account
### Description: 
Method: PUT
>```
>{{local}}/auth/my-account/activate
>```
### Body (**raw**)

```json
{
  "card_number": "4187427415564246",
  "amount": 100,
  "cvv": "828",
  "expiry_month": "01",
  "expiry_year": "21"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk0NTg2ODQ0fQ.ogyWG3mEoKd6KZOqIGKkcX5qhG3OFXCM3iV6udJGZPE|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete account / cancel membership
### Description: 
Method: DELETE
>```
>{{staging}}/auth/my-account/delete
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImtlZmlqMzg4NTVAaW5tYWlsMy5jb20iLCJpYXQiOjE1OTQxNjQ3ODB9.ScEVx8W6HLauNrnUHLq7u6YSpVNmlYu-PM6zfkfEOKk|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Admin 


## End-point: Login super admin
### Description: 
Method: POST
>```
>{{production}}/auth/login
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "password": "e6b96b52903958f5f563e5bff37e1f61e6b96b52903958f5f563e5bff37e1f61",
    "email": "sdflsdjflj@cinetie.com"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Approve video
### Description: 
Method: POST
>```
>{{staging}}/video/new?id=25
>```
### Query Params

|Param|value|
|---|---|
|id|25|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjgyMDl9.mx74KaV-YwyX-6WqDhBiNl453yi7Nsr3POnnnP48-4s|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get All earnings
### Description: 
Method: GET
>```
>{{local}}/admin/earnings
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODMyMzQ2Nzh9.mGYS6jcttCgpAfPT5wxHTn_iaCx1lMfXghz5Iune_0g|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: All active earnings 
### Description: 
Method: GET
>```
>{{local}}/admin/earnings/active
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODMyMzQ2Nzh9.mGYS6jcttCgpAfPT5wxHTn_iaCx1lMfXghz5Iune_0g|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: GetAllCP
### Description: 
Method: GET
>```
>{{production}}/cp/all
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjA5MzR9.yDoslTA-eOIz5k5wIs5ZA3UbAABBm6rkSw3_4jP1Jc0|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all earnings per cp
### Description: 
Method: GET
>```
>{{local}}/admin/earnings/cp?clientId=949648e4-c41c-4272-9268-c12fe104cc2a
>```
### Query Params

|Param|value|
|---|---|
|clientId|949648e4-c41c-4272-9268-c12fe104cc2a|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjE5MDd9.qR5N1uUG_F9E0spZRfvbLZd84CslBApI9tETQYZFWY8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get videos per cp - Admin
### Description: 
Method: GET
>```
>{{local}}/admin/videos/cp?clientId=598168c9-76af-47b2-8c25-a777acbc916a
>```
### Query Params

|Param|value|
|---|---|
|clientId|598168c9-76af-47b2-8c25-a777acbc916a|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6ImMueGEqeXFuNFFIRDNheSIsImlhdCI6MTU3NzM4OTk1OH0.432N4-gpCdFMIYjRfyMwLYyYQ1wKPay1dWNQgXU6VTc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get Earnings per video
### Description: 
Method: GET
>```
>{{local}}/admin/earnings/video?videoId=1770fc2f-50a0-4350-8a73-9a03d84d4f30
>```
### Query Params

|Param|value|
|---|---|
|videoId|1770fc2f-50a0-4350-8a73-9a03d84d4f30|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODMyMzQ4MTl9.QiIrt1Lexg9auyAup065cIWECWHVuaxyi-bKuojgoig|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all videos
### Description: 
Method: GET
>```
>{{local}}/admin/videos
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODMzOTYyMzd9.qRXxO1DdePWmkSX6R5JAb6dqAVMP1mCITeRVvih7HEk|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all sales
### Description: 
Method: GET
>```
>{{aws}}/admin/sales/all
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODI4OTE3MzN9.A9DyCDSMyBUxMvRgtryPEXpsbgxEXxAsShItx6TCiws|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: gain provider access
### Description: 
Method: POST
>```
>{{local}}/admin/gain-access
>```
### Body (**raw**)

```json
{
    "email": "alainchristian87@gmail.com",
    "clientId": "9e40dcbb-7250-4dee-989e-ba538b25fb2e"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1OTQ4OTc0NzB9.bVJghcnx-mKnsQSCZJoOLbNURft5QF-3bLHJWtNIKRw|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Content provider 


## End-point: Signup
### Description: 
Method: POST
>```
>{{local}}/cp/signup
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body formdata

|Param|value|Type|
|---|---|---|
|image|/C:/Users/HP/Downloads/a5bb813e-1ab2-468f-9dcb-081b6f86e024 (2).png|file|
|name|Bobos|text|
|email|dofiv33450@qlenw.com|text|
|nationality|American|text|
|cityOfResidence|Boston|text|
|password|nAdia123|text|
|phoneLine|0080880808|text|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Verify Email
### Description: 
Method: GET
>```
>https://cinetie.herokuapp.com/cp/verify/?id=4&token=eyJhbGciOiJIUzI1NiJ9.c2FsZXNAZGMuY29t.4x4dLsA4PtRqCJi0uCSaCXbRI2xYy17fKuan-uj0bfw
>```
### Query Params

|Param|value|
|---|---|
|id|4|
|token|eyJhbGciOiJIUzI1NiJ9.c2FsZXNAZGMuY29t.4x4dLsA4PtRqCJi0uCSaCXbRI2xYy17fKuan-uj0bfw|
|null|null|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Login
### Description: 
Method: POST
>```
>{{local}}/cp/login
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"email":"alainchristian87@gmail.com",
	"password":"qazwsx"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: forgot password
### Description: 
Method: POST
>```
>{{local}}/cp/forgot-password
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"email":"alainchristian87@gmail.com"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete account
### Description: 
Method: DELETE
>```
>{{local}}/cp/delete_acc
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiY2xpZW50SWQiOiIxZmFmZTJhMi0wM2Q5LTQzYjItYjE0Yi04Y2QyOTFlYmU0YTciLCJpYXQiOjE1Nzk5NDQ5NTR9.gJXRiG03LRGb3eq2QPCTJDGw-bPi-pBKuPfkSd3Xa2c|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update cp
### Description: 
Method: PUT
>```
>{{local}}/cp/update
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"nationality":"American"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InNhbGVzQG1hcnZlbC5jb20iLCJjbGllbnRJZCI6IjU5ODE2OGM5LTc2YWYtNDdiMi04YzI1LWE3NzdhY2JjOTE2YSIsImlhdCI6MTU4MDEyMjIzN30.Oi6h9kVOYvQkyl7pUXx7V93sAO8Uo0EC8Hicle_8MAM|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get videos per cp
### Description: 
Method: GET
>```
>{{local}}/cp/videos
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODc1MDc0OTN9.kMRaBwg2iMkgecXYKZWVRQlOfPZxulS9kYFIW5p9qso|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get active  earnings per cp
### Description: 
Method: GET
>```
>{{local}}/cp/earnings/active
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODgxNTYxOTd9.lBvH-3554izO4b1k0knKRCz9gsGtcGfxRAKWyAsk8L8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all earnings per cp
### Description: 
Method: GET
>```
>{{local}}/cp/earnings
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODgxNTYxOTd9.lBvH-3554izO4b1k0knKRCz9gsGtcGfxRAKWyAsk8L8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get cp details
### Description: 
Method: GET
>```
>https://cinetie.herokuapp.com/cp/details
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InNhbGVzQG1hcnZlbC5jb20iLCJjbGllbnRJZCI6IjU5ODE2OGM5LTc2YWYtNDdiMi04YzI1LWE3NzdhY2JjOTE2YSIsImlhdCI6MTU4MDA1NzY0Mn0.GtBmLh4PBiDafQWaFD6LTDb1kYds6o3n7VCP6D0ldP8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: getting video details
### Description: 
Method: GET
>```
>{{staging}}/video/cp/unique?id=7ff9ec97-425d-4231-a8a7-775bd3dd969a
>```
### Query Params

|Param|value|
|---|---|
|id|7ff9ec97-425d-4231-a8a7-775bd3dd969a|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFzZXJnZWJvYm9zQGdtYWlsLmNvbSIsImNsaWVudElkIjoiOTQ5NjQ4ZTQtYzQxYy00MjcyLTkyNjgtYzEyZmUxMDRjYzJhIiwiaWF0IjoxNTgzOTIyMTg2fQ.HGZ4JyDFgFvXTIrPwqoT6HE3Lr5jBjxN2QhlwhOPsJc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: cp get video
### Description: 
Method: GET
>```
>{{staging}}/video/cp/unique?id=28b3e702-f789-47ae-86cb-65bdda9548a7
>```
### Query Params

|Param|value|
|---|---|
|id|28b3e702-f789-47ae-86cb-65bdda9548a7|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFzZXJnZWJvYm9zQGdtYWlsLmNvbSIsImNsaWVudElkIjoiOTQ5NjQ4ZTQtYzQxYy00MjcyLTkyNjgtYzEyZmUxMDRjYzJhIiwiaWF0IjoxNTgzOTIyMTg2fQ.HGZ4JyDFgFvXTIrPwqoT6HE3Lr5jBjxN2QhlwhOPsJc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get upload tokens
### Description: 
Method: GET
>```
>{{local}}/cp/upload-tokens
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODYzNDU1MTF9.Bdr0oy4UdOoxWpFYUyAF5pHsS-JAHAjakUfaz0yKFYM|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Analytics 


## End-point: pull video demographics
### Description: 
Method: GET
>```
>{{local}}/sessions/video?videoId=1770fc2f-50a0-4350-8a73-9a03d84d4f30
>```
### Query Params

|Param|value|
|---|---|
|videoId|1770fc2f-50a0-4350-8a73-9a03d84d4f30|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODQyNjEwNzJ9.VEIiTft1O8twdaA_t26g4Gjrr5SBETjdnavoqGRocLg|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get live users
### Description: 
Method: GET
>```
>{{production}}/auth/users/live
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjE5MDd9.qR5N1uUG_F9E0spZRfvbLZd84CslBApI9tETQYZFWY8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get users in range
### Description: 
Method: GET
>```
>{{local}}/auth/users?start=2020-07-01&end=7-21-2020
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Query Params

|Param|value|
|---|---|
|start|2020-07-01|
|end|7-21-2020|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODI3MTE4OTV9.uY21kRaRZHH41ujvGxtMnQe-Cj7gqWZUWpqdd9Y_k5Y|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all transactions by cp
### Description: 
Method: GET
>```
>{{local}}/cp/trans
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InNhbGVzQG1hcnZlbC5jb20iLCJjbGllbnRJZCI6IjU5ODE2OGM5LTc2YWYtNDdiMi04YzI1LWE3NzdhY2JjOTE2YSIsImlhdCI6MTU3OTY4MTEyM30.32NU_yGUpydTIbLx9x-jQyMUVuPqQF43DmNUekRGmyw|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: plan 


## End-point: Add new plan
### Description: 
Method: POST
>```
>{{production}}/plan/new
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	
    "numberOfScreens":1,
    "monthlyPrice": 0.00,
    "yearlyPrice": 0.00,
    "type":"Setup"
}

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODM0MTY3NTl9.DMlqsXW6xtnjegYe4Nj-1cvfM4uBxqEJnV3x16CRTSE|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: fetch all plans
### Description: 
Method: GET
>```
>{{production}}/plan
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete plan
### Description: 
Method: DELETE
>```
>{{local}}/plan/4?rave=18735
>```
### Query Params

|Param|value|
|---|---|
|rave|18735|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODI4OTc0NjF9.-h7G8usFrFPC_MVBCxTCjiNbQyH-kj0OzrZEDOtpLLk|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update plan
### Description: 
Method: PUT
>```
>{{staging}}/plan/2
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"yearlyPrice": "60.0000"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODI4OTc0NjF9.-h7G8usFrFPC_MVBCxTCjiNbQyH-kj0OzrZEDOtpLLk|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Video 


## End-point: upload video to temp server
### Description: 
Method: POST
>```
>{{local}}/temp/new
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|videoName|Bad Boys 5|text|
|videoCast|Vin Diesel|text|
|videoSynopsis|The end of the entire world|text|
|category|Action|text|
|portrait|186a887d-44da-4aad-8322-d01357c98fd5.jpg|text|
|nameTag|be932ec8-8de2-4c94-9566-c2fc17570cc5.png|text|
|landscape|98716207-df16-40ae-b822-ed50e3700a46.jpg|text|
|video|45447b5a-0768-4849-94fa-c373ed1d6ad9.mp4|text|
|type|movie|text|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODYzNDU1MTF9.Bdr0oy4UdOoxWpFYUyAF5pHsS-JAHAjakUfaz0yKFYM|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: GetAllTempVideos
### Description: 
Method: GET
>```
>{{local}}/temp/all
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjE5MDd9.qR5N1uUG_F9E0spZRfvbLZd84CslBApI9tETQYZFWY8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Delete temp video
### Description: 
Method: DELETE
>```
>{{aws}}/temp?id=6
>```
### Query Params

|Param|value|
|---|---|
|id|6|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6ImMueGEqeXFuNFFIRDNheSIsImlhdCI6MTU3NzM4OTk1OH0.432N4-gpCdFMIYjRfyMwLYyYQ1wKPay1dWNQgXU6VTc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update temp video
### Description: 
Method: PUT
>```
>{{local}}/temp/update?id=3
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"videoName":"Semper fi"
}
```

### Query Params

|Param|value|
|---|---|
|id|3|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6ImMueGEqeXFuNFFIRDNheSIsImlhdCI6MTU3NzM4OTk1OH0.432N4-gpCdFMIYjRfyMwLYyYQ1wKPay1dWNQgXU6VTc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get videos by popularity
### Description: 
Method: GET
>```
>{{staging}}/video/sort/pop?offset=0&limit=2&type=movie
>```
### Query Params

|Param|value|
|---|---|
|offset|0|
|limit|2|
|type|movie|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiaWF0IjoxNTgzMDgxNTc1fQ.THkarch9czlmkL5OsCVcYOs1v96soP2sAHO8x2h4K5s|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get videos by trend
### Description: 
Method: GET
>```
>{{local}}/video/sort/trend?offset=0&limit=20&type=movie
>```
### Query Params

|Param|value|
|---|---|
|offset|0|
|limit|20|
|type|movie|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk1Nzk3MzIxfQ.-58-2_qftdCGXFpNOtlyQ0ELq99MsVN3mBXQs9Ylx2A|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get particular or unique video
### Description: 
Method: GET
>```
>{{local}}/video/unique?id=6babf820-e322-4cd9-abb1-44997841a9af
>```
### Headers

|Content-Type|Value|
|---|---|
|ip|155.142.46.148|


### Query Params

|Param|value|
|---|---|
|id|6babf820-e322-4cd9-abb1-44997841a9af|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiaWF0IjoxNTg2OTc5NTIxfQ.YUAgX4nh2JUjiRLQTRoMe8LEldUpKc5smVxUURKW1EU|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get Featured
### Description: 
Method: GET
>```
>{{staging}}/video/main/ft?type=movie
>```
### Query Params

|Param|value|
|---|---|
|type|movie|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiaWF0IjoxNTgzMDgxNTc1fQ.THkarch9czlmkL5OsCVcYOs1v96soP2sAHO8x2h4K5s|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get Featured second
### Description: 
Method: GET
>```
>{{local}}/video/second/ft?type=serie
>```
### Query Params

|Param|value|
|---|---|
|type|serie|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiaWF0IjoxNTgzMDgxNTc1fQ.THkarch9czlmkL5OsCVcYOs1v96soP2sAHO8x2h4K5s|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update video
### Description: 
Method: PUT
>```
>{{local}}/video?id=1e9faac2-aa96-4dd7-8d33-fcb10dc81072
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"videoName":"snapshot v1"
}
```

### Query Params

|Param|value|
|---|---|
|id|1e9faac2-aa96-4dd7-8d33-fcb10dc81072|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODY1NDc3NTZ9.HbRLGuuIq7UwuiYC3vM2ZnZLLpR5HFAGBRRpTEnUMB4|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete video
### Description: 
Method: DELETE
>```
>{{local}}/video?id=ac86b7e0-68be-47d6-9a91-30bdcd27a50bw
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Query Params

|Param|value|
|---|---|
|id|ac86b7e0-68be-47d6-9a91-30bdcd27a50bw|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODc1MDc0OTN9.kMRaBwg2iMkgecXYKZWVRQlOfPZxulS9kYFIW5p9qso|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get new videos
### Description: 
Method: GET
>```
>{{staging}}/video/arrivals?offset=0&limit=2&type=serie
>```
### Query Params

|Param|value|
|---|---|
|offset|0|
|limit|2|
|type|serie|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiaWF0IjoxNTgzMDgxNTc1fQ.THkarch9czlmkL5OsCVcYOs1v96soP2sAHO8x2h4K5s|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all videos - DB
### Description: 
Method: GET
>```
>{{local}}/video/all/local
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODMwODI4NDF9.HoiOou1gminOlWp_v1YKuVALbSyDilh0kAibrLUZJUY|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: search
### Description: 
Method: GET
>```
>{{local}}/video/search?q=ba&offset=0
>```
### Query Params

|Param|value|
|---|---|
|q|ba|
|offset|0|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiaWF0IjoxNTg2ODU3MTAwfQ.FcdoOJivU0AuX-JsgyOzpOUV6Cdxi5cUM8TH8PhpXoA|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get single video
### Description: 
Method: GET
>```
>{{staging}}/video/unique?id=b6148dba-0c46-48c4-acb5-5c9e6762b86d
>```
### Headers

|Content-Type|Value|
|---|---|
|ip|187.243.2.74|


### Query Params

|Param|value|
|---|---|
|ip||
|id|b6148dba-0c46-48c4-acb5-5c9e6762b86d|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk1NTEwODE0fQ.dojxLud4802HZKYhbD1Qlp6YDkILUdRCE_qW3gFQ8mc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get earnings per video
### Description: 
Method: GET
>```
>{{local}}/video/earnings?videoId=848f1864-2161-414b-bc5a-06dc9cacf317
>```
### Query Params

|Param|value|
|---|---|
|videoId|848f1864-2161-414b-bc5a-06dc9cacf317|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get active earnings per video
### Description: 
Method: GET
>```
>https://cinetie.herokuapp.com/cp/earnings/active/video?videoId=848f1864-2161-414b-bc5a-06dc9cacf317
>```
### Query Params

|Param|value|
|---|---|
|videoId|848f1864-2161-414b-bc5a-06dc9cacf317|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InNhbGVzQG1hcnZlbC5jb20iLCJjbGllbnRJZCI6IjU5ODE2OGM5LTc2YWYtNDdiMi04YzI1LWE3NzdhY2JjOTE2YSIsImlhdCI6MTU3OTA5NTk3NH0.XhtceCQy8QWz25UDb6Xzi4khmFT18ffzxd6ka0LgBes|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get videos by type
### Description: 
Method: GET
>```
>{{local}}/video/sort/type?type=serie
>```
### Query Params

|Param|value|
|---|---|
|type|serie|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFzZXJnZWJvYm9zQGdtYWlsLmNvbSIsImNsaWVudElkIjoiOTQ5NjQ4ZTQtYzQxYy00MjcyLTkyNjgtYzEyZmUxMDRjYzJhIiwiaWF0IjoxNTgzOTMwMjMwfQ.-pc0vK7LlWQlSpi4GPwB-mBx_EoSNzi_upb4NcR-Qd4|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: set video as featured
### Description: 
Method: PUT
>```
>{{local}}/video/set-featured?id=6babf820-e322-4cd9-abb1-44997841a9af
>```
### Body (**raw**)

```json
{
	"isFeatured":true,
	"featureType":1,
	"type":"movie"
}
```

### Query Params

|Param|value|
|---|---|
|id|6babf820-e322-4cd9-abb1-44997841a9af|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODYzNDQzMDh9.TmNDgZDr6UkYst00G6G8Pk8HuGgcwrVcPVrzmPaunLM|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get temp signedurls
### Description: 
Method: GET
>```
>{{staging}}/temp/signed-urls?type=movie&&extension=mp4
>```
### Query Params

|Param|value|
|---|---|
|type|movie|
|null|null|
|extension|mp4|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODYzNDU1MTF9.Bdr0oy4UdOoxWpFYUyAF5pHsS-JAHAjakUfaz0yKFYM|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ 


## End-point: register stream session
### Description: 
Method: POST
>```
>{{local}}/video/watch-session?id=4fc3a847-dd0e-44ad-8153-175e6a55ec77
>```
### Headers

|Content-Type|Value|
|---|---|
|ip|192.168.21.81|


### Body (**raw**)

```json
{
    "ip":"192.168.21.81"
}
```

### Query Params

|Param|value|
|---|---|
|id|4fc3a847-dd0e-44ad-8153-175e6a55ec77|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk1NTEwODE0fQ.dojxLud4802HZKYhbD1Qlp6YDkILUdRCE_qW3gFQ8mc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get single temp movie
### Description: 
Method: GET
>```
>{{local}}/temp?id=22
>```
### Query Params

|Param|value|
|---|---|
|id|22|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjE5MDd9.qR5N1uUG_F9E0spZRfvbLZd84CslBApI9tETQYZFWY8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: trailer 


## End-point: create new trailer
### Description: 
Method: POST
>```
>{{local}}/trailer/new
>```
### Body (**raw**)

```json
{
    "videoId":"4e9ec1f5-11a7-4e77-b2b2-e1e477cf7fff",
    "trailer": "141b01ab-9963-4e4b-81f5-d587c856c052.png"
}

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODc1MDc0OTN9.kMRaBwg2iMkgecXYKZWVRQlOfPZxulS9kYFIW5p9qso|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all trailers per video
### Description: 
Method: GET
>```
>{{local}}/trailer/sort/video?id=4e9ec1f5-11a7-4e77-b2b2-e1e477cf7fff
>```
### Query Params

|Param|value|
|---|---|
|id|4e9ec1f5-11a7-4e77-b2b2-e1e477cf7fff|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get particular trailer
### Description: 
Method: GET
>```
>{{local}}/trailer/particular?videoId=9f4a5fd8-78c5-419c-b980-d6664f242f98
>```
### Query Params

|Param|value|
|---|---|
|videoId|9f4a5fd8-78c5-419c-b980-d6664f242f98|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: update trailer
### Description: 
Method: PUT
>```
>https://cinetie.herokuapp.com/trailer/update?id=2
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
	"trailerLink":"https://storage.googleapis.com/cinetie/86ab23cb-8e4c-4ad6-a166-fee5b2cd657c.mp4"
}
```

### Query Params

|Param|value|
|---|---|
|id|2|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6ImMueGEqeXFuNFFIRDNheSIsImlhdCI6MTU3NzM4OTk1OH0.432N4-gpCdFMIYjRfyMwLYyYQ1wKPay1dWNQgXU6VTc|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete trailer
### Description: 
Method: DELETE
>```
>{{local}}/trailer/delete?id=1
>```
### Query Params

|Param|value|
|---|---|
|id|1|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODc1MDc0OTN9.kMRaBwg2iMkgecXYKZWVRQlOfPZxulS9kYFIW5p9qso|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Generate upload link
### Description: 
Method: GET
>```
>{{local}}/trailer/upload-link?extension=mp4
>```
### Query Params

|Param|value|
|---|---|
|extension|mp4|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODc1MDc0OTN9.kMRaBwg2iMkgecXYKZWVRQlOfPZxulS9kYFIW5p9qso|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: tv series 


## End-point: upload episode to temporary server
### Description: 
Method: POST
>```
>{{local}}/temp/series/new
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|video|141b01ab-9963-4e4b-81f5-d587c856c052.png|text|
|episodeName|part 1|text|
|season|2|text|
|videoId|e94683c6-1e48-46e4-ab9d-a2e0588f43ce|text|
|thumb|cameliian-series.mp4|text|
|synopsis|The begining of everything as we excepect|text|
|episodeNumber|2|text|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODYzNDU1MTF9.Bdr0oy4UdOoxWpFYUyAF5pHsS-JAHAjakUfaz0yKFYM|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: approve episodes
### Description: 
Method: POST
>```
>{{staging}}/series/create?id=111
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|episode|/C:/Users/alain/Downloads/5afdb453-e579-48f8-9dab-4a77b91f51fc.avi|file|


### Query Params

|Param|value|
|---|---|
|id|111|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODM5MzcyMTl9.hF23w7KJhO9v8-01R9ZiaRx14AtdZo2c0JnnOalFp2g|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all temp series for approval
### Description: 
Method: GET
>```
>{{staging}}/temp/series/all
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODM5MzcyMTl9.hF23w7KJhO9v8-01R9ZiaRx14AtdZo2c0JnnOalFp2g|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get All episodes per season
### Description: 
Method: GET
>```
>{{local}}/series/single/season?s=2&id=&limit=10&offset=0
>```
### Query Params

|Param|value|
|---|---|
|s|2|
|id||
|limit|10|
|offset|0|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InRpeW92YTQ2NTBAZW50cmFzdGQuY29tIiwiaWF0IjoxNTk1ODAwMjg1fQ.gEDUdJPmaN-iAjgiyiAxcQhWQRrJwRY-cpSsbqDLk7w|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get single episode
### Description: 
Method: GET
>```
>{{staging}}/series/ep?ep=1&id=797a4f98-7e96-4440-a805-2646b7764
>```
### Headers

|Content-Type|Value|
|---|---|
|ip|155.142.46.148|


### Query Params

|Param|value|
|---|---|
|ep|1|
|id|797a4f98-7e96-4440-a805-2646b7764|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFzZXJnZWJvYm9zQGdtYWlsLmNvbSIsImNsaWVudElkIjoiOTQ5NjQ4ZTQtYzQxYy00MjcyLTkyNjgtYzEyZmUxMDRjYzJhIiwiaWF0IjoxNTgzOTMwMjMwfQ.-pc0vK7LlWQlSpi4GPwB-mBx_EoSNzi_upb4NcR-Qd4|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get all seasons
### Description: 
Method: GET
>```
>{{staging}}/series/all/seasons?videoId=797a4f98-7e96-4440-a805-2646b77646cc
>```
### Query Params

|Param|value|
|---|---|
|videoId|797a4f98-7e96-4440-a805-2646b77646cc|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFhbGFpbmNAZ21haWwuY29tIiwiaWF0IjoxNTgzMDgxNTc1fQ.THkarch9czlmkL5OsCVcYOs1v96soP2sAHO8x2h4K5s|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get series by clientId
### Description: 
Method: GET
>```
>{{local}}/series/cp
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFzZXJnZWJvYm9zQGdtYWlsLmNvbSIsImNsaWVudElkIjoiOTQ5NjQ4ZTQtYzQxYy00MjcyLTkyNjgtYzEyZmUxMDRjYzJhIiwiaWF0IjoxNTg0NDA3NDgzfQ.-Lotypqq3DlNTZiZwEecc7IYCiTWvJ3VcxA3oj2G3r4|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: CP get all episodes per season
### Description: 
Method: GET
>```
>{{staging}}/series/cp/single/season?s=1&id=797a4f98-7e96-4440-a805-2646b77646cc&limit=10&offset=0
>```
### Query Params

|Param|value|
|---|---|
|s|1|
|id|797a4f98-7e96-4440-a805-2646b77646cc|
|limit|10|
|offset|0|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6Im11Z2lzaGFzZXJnZWJvYm9zQGdtYWlsLmNvbSIsImNsaWVudElkIjoiOTQ5NjQ4ZTQtYzQxYy00MjcyLTkyNjgtYzEyZmUxMDRjYzJhIiwiaWF0IjoxNTgzOTMwMjMwfQ.-pc0vK7LlWQlSpi4GPwB-mBx_EoSNzi_upb4NcR-Qd4|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: delete episode
### Description: 
Method: DELETE
>```
>{{local}}/series/delete/2
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODc1MDc0OTN9.kMRaBwg2iMkgecXYKZWVRQlOfPZxulS9kYFIW5p9qso|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get temp signed urls series
### Description: 
Method: GET
>```
>{{staging}}/temp/series/signed-url?extension=mp4
>```
### Query Params

|Param|value|
|---|---|
|extension|mp4|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiY2xpZW50SWQiOiIwYzNiZTkyZi0zNzgyLTQ0YzMtYjc0Zi1lY2RiZWY5ZTQ0OTIiLCJpYXQiOjE1ODYzNDU1MTF9.Bdr0oy4UdOoxWpFYUyAF5pHsS-JAHAjakUfaz0yKFYM|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get single temp serie
### Description: 
Method: GET
>```
>{{local}}/temp/series?id=2
>```
### Query Params

|Param|value|
|---|---|
|id|2|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODAxNjE5MDd9.qR5N1uUG_F9E0spZRfvbLZd84CslBApI9tETQYZFWY8|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: paypal  


## End-point: auth
### Description: 
Method: POST
>```
>https://api.sandbox.paypal.com/v1/oauth2/token
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/x-www-form-urlencoded|


### 🔑 Authentication basic

|Param|value|Type|
|---|---|---|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: paypal list transactions
### Description: 
Method: GET
>```
>https://api.sandbox.paypal.com/v1/billing/subscriptions/I-M89B7PXJLL6P/transactions?start_time=2020-01-26T22:00:00.000Z&end_time=2020-01-31T22:00:00.000Z
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|start_time|2020-01-26T22:00:00.000Z|
|end_time|2020-01-31T22:00:00.000Z|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|A21AAF2PWCctAGH8_jp5LZJIa08Dhl4Od4bAWXAHDydnU-LnTQD-Xm3M-9L4bbNviP8aUPR6VOpNvEel1wzN5EkedDm5-LSUw|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: List paypal trans via API
### Description: 
Method: GET
>```
>{{local}}/trans/paypal/list
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImNhcnJ5c21pdGhAZ21haWwuY29tIiwiaWF0IjoxNTgwNzIyMjQ1fQ.2jGpyLf8j52QP8nmgZbpFQpHOgNcStoK2SrH_xsQvQ0|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Webhooks 


## End-point: Rave Webhook
### Description: 
Method: POST
>```
>{{sub-service}}/payment/hook
>```
### Headers

|Content-Type|Value|
|---|---|
|verify-hash|FLWSECK_TEST-9c070d3e072335da18b5988f4c0701dd-X|


### Body (**raw**)

```json
{
  "event": "charge.completed",
  "data": {
    "id": 1403325,
    "tx_ref": "Links-616626414629",
    "flw_ref": "PeterEkene/FLW270177170",
    "device_fingerprint": "a42937f4a73ce8bb8b8df14e63a2df31",
    "amount": 100,
    "currency": "NGN",
    "charged_amount": 100,
    "app_fee": 1.4,
    "merchant_fee": 0,
    "processor_response": "Approved by Financial Institution",
    "auth_model": "PIN",
    "ip": "197.210.64.96",
    "narration": "CARD Transaction ",
    "status": "successful",
    "payment_type": "card",
    "created_at": "2020-07-06T19:17:04.000Z",
    "account_id": 17321,
    "customer": {
      "id": 215604089,
      "name": "Yemi Desola",
      "phone_number": null,
      "email": "alainchristian87@gmail.com",
      "created_at": "2020-07-06T19:17:04.000Z"
    },
    "card": {
      "first_6digits": "123456",
      "last_4digits": "7889",
      "issuer": "VERVE FIRST CITY MONUMENT BANK PLC",
      "country": "NG",
      "type": "VERVE",
      "expiry": "02/23"
    }
  }
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsYWluY2hyaXN0aWFuODdAZ21haWwuY29tIiwiaWQiOiI1ZWNhYmQ4MzRkY2Y3ZjAwMmYyZmVjMmIiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5MDM4Mjg5NX0.kjJoavjFar8__sn7s_E7QJg6kdDmJyuE1xIZJqeU67E|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: index
### Description: 
Method: GET
>```
>{{local}}/
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: get videos by type
### Description: 
Method: GET
>```
>
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

_________________________________________________
Author: [bautistaj](https://github.com/bautistaj)

Package: [postman-to-markdown](https://github.com/bautistaj)
