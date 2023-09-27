# Authentication

Authentication module is connected to every other module of EverREST.
This means that, for example, if there is a user-related logic in shop
or chat module that you want to integrate in your app, you will also
need to use authentication endpoints.

Authentication uses access tokens through both `Authorization` header and
cookies, allowing you to use whichever option you see fit.

Base URL:

```
https://api.everrest.educata.dev/auth
```

## Sign Up

- Method: `POST`
- URL: `https://api.everrest.educata.dev/auth/sign_up`

### Body

- `firstName`: string
- `lastName` : string
- `age` : number
- `email` : string
- `password` : string
- `address` : string
- `phone` : string
- `zipcode` : string
- `avatar` : string
- `gender` : `"MALE"` `"FEMALE"` `"OTHER"`

::: info NOTE
Use (preferrably small size) image URLs for `avatar`.
`https://api.dicebear.com` is a good resource for random avatars.
:::

### Example

```sh
curl -X 'POST' \
  'http://api.everrest.educata.dev/auth/sign_up' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30,
  "email": "john@doe.com",
  "password": "badpass123",
  "address": "somewhere",
  "phone": "+995599123456",
  "zipcode": "0178",
  "avatar": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane",
  "gender": "MALE"
}'
```

### Response

```json
{
  "_id": "650af7ec1e95c9f19d878f61",
  "firstName": "John",
  "lastName": "Doe",
  "age": 30,
  "email": "john@doe.com",
  "address": "somewhere",
  "role": "default",
  "zipcode": "0178",
  "avatar": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane",
  "gender": "MALE",
  "phone": "+995599123456",
  "verified": false
}
```

::: info NOTE
Email verification may also be required.
:::

## Sign In

- Method: `POST`
- URL: `https://api.everrest.educata.dev/auth/sign_in`

### Body

- `email`: string
- `password`: string

### Example

```sh
curl -X 'POST' \
  'http://api.everrest.educata.dev/auth/sign_in' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "john@doe.com",
  "password": "badpass123"
}'
```

### Response

```json
{
  "access_token": "example_access_token_string",
  "refresh_token": "example_refresh_token_string"
}
```

## Verify Email

- Method: `POST`
- URL: `https://api.everrest.educata.dev/auth/verify_email`

### Body

- `email` : string

### Example

```sh
curl -X 'POST' \
  'https://api.everrest.educata.dev/auth/verify_email' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "john@doe.com"
}'
```

### Response

```json
{
  "status": 200,
  "message": "If we find the email in the database, we will send a verify mail"
}
```

::: info NOTE
The user will be required to follow the verification link sent to their email.
:::

## Get Current User

- Method: `GET`
- URL: `https://api.everrest.educata.dev/auth`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/auth' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <your_token_here>'
```

::: info NOTE
requires access token attatched either to cookies or `Authorization` header.
:::

### Response

```json
{
  "_id": "64f2da8cea119c908673da3c",
  "firstName": "John",
  "lastName": "Doe",
  "age": 50,
  "email": "john.doe@fakemail.com",
  "address": "somewhere over the rainbow",
  "role": "default",
  "zipcode": "1234",
  "avatar": "https://api.dicebear.com/6.x/lorelei/svg?flip=false",
  "gender": "MALE",
  "phone": "+995555123456",
  "verified": true,
  "iat": 1695313435,
  "exp": 1695317035
}
```

::: info NOTE
The user must be verified to get this response.
:::

## Get User By ID

- Method: `GET`
- URL: `https://api.everrest.educata.dev/auth/id/:id`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/auth/id/64f2da8cea119c908673da3c' \
  -H 'accept: application/json'
```

### Response

```json
{
  "_id": "64f2da8cea119c908673da3c",
  "firstName": "John",
  "lastName": "Doe",
  "age": 50,
  "email": "john.doe@fakemail.com",
  "address": "somewhere over the rainbow",
  "role": "default",
  "zipcode": "1234",
  "avatar": "https://api.dicebear.com/6.x/lorelei/svg?flip=false",
  "gender": "MALE",
  "phone": "+995555123456",
  "verified": true,
  "iat": 1695313435,
  "exp": 1695317035
}
```

## Get All Users

- Method: `GET`
- URL: `https://api.everrest.educata.dev/auth/all`

### Query Params

- `page_size`: number
- `page_index`: number

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/auth/all?page_index=1&page_size=5' \
  -H 'accept: */*'
```

### Response

```json
{
  "total": 8,
  "limit": 5,
  "page": 1,
  "skip": 0,
  "users": [
    {
      "_id": "64eb7cc5d65558315ab2834e",
      "firstName": "Ahmad",
      "lastName": "Jamal",
      "age": 50,
      "email": "ahmadjamal@jazz.org",
      "address": "nowhere",
      "role": "default",
      "zipcode": "1234",
      "avatar": "https://api.dicebear.com/6.x/lorelei/svg?flip=false",
      "gender": "male",
      "phone": "+123456789",
      "verified": false
    },
    {
      "_id": "650af7ec1e95c9f19d878f61",
      "firstName": "John",
      "lastName": "Doe",
      "age": 30,
      "email": "john@doe.com",
      "address": "somewhere",
      "role": "default",
      "zipcode": "0178",
      "avatar": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane",
      "gender": "MALE",
      "phone": "+995599123456",
      "verified": false
    }

    // ...
  ]
}
```

## Refresh Token

- Method: `GET`
- URL: `https://api.everrest.educata.dev/auth/refresh`

### Example

```sh
curl -X 'POST' \
  'https://api.everrest.educata.dev/auth/refresh' \
  -H 'accept: */*' \
  -d ''
```

### Response

```json

Response body

{
  "access_token": "<refreshed_token_here>"
}
```

## Update User Data

- Method: `PATCH`
- URL: `https://api.everrest.educata.dev/auth/update`

### Body

- `firstName` : string
- `lastName` : string
- `age` : number
- `email` : string
- `address` : string
- `phone` : string
- `zipcode` : string
- `avatar` : string
- `gender` : `"MALE"` `"FEMALE"` `"OTHER"`

### Example

```sh
curl -X 'PATCH' \
  'https://api.everrest.educata.dev/auth/update' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "Barry",
  "lastName": "Harris",
  "age": 91,
  "email": "barryharris@jazz.org",
  "address": "canada",
  "phone": "+995995123456",
  "zipcode": "0178",
  "avatar": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Barry",
  "gender": "MALE"
}'
```

### Response

```json
{
  "_id": "64f2da8cea119c908673da3c",
  "firstName": "Barry",
  "lastName": "Harris",
  "age": 91,
  "email": "barryharris@jazz.org",
  "address": "canada",
  "phone": "+995599123456",
  "role": "default",
  "zipcode": "0178",
  "avatar": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Barry",
  "gender": "MALE",
  "cartID": "",
  "verified": true,
  "chatIds": [],
  "__v": 0
}
```

## Recover Password

- METHOD: `POST`
- URL: `https://api.everrest.educata.dev/auth/recovery`

### Body

- `email` : string

### Example

```sh
curl -X 'POST' \
  'https://api.everrest.educata.dev/auth/recovery' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "john@doe.com"
}'
```

### Response

```json
{
  "status": 200,
  "message": "If we find the verified email in the database, we will send a recovery mail"
}
```

::: warning NOTE
This changes user's password into an automatically generated one which will be sent to their email.
The user then can access his account with it and optionally [change it](#change-password).
:::

## Change Password

- Method: `PATCH`
- URL: `https://api.everrest.educata.dev/auth/change_password`

### Body

- `oldPassword` : string
- `newPassword` : string

::: info NOTE
If the user has sent a [password recovery request](#recover-password), the `oldPassword` should
be the one generated by the server.
:::

### Example

```sh
curl -X 'PATCH' \
  'https://api.everrest.educata.dev/auth/change_password' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "oldPassword": "badpass123",
  "newPassword": "newbadpass123"
}'
```

### Response

```json
{
  "access_token": "example_access_token_string",
  "refresh_token": "example_refresh_token_string"
}
```

:::info NOTE
This endpoint essentialy signs the user in again, hence the tokens in response.
:::
