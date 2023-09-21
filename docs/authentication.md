# Authentication

Authentication module is connected to every other module of EverREST.
This means that, for example, if there is a user-related logic in shop
or chat module that you want to integrate in your app, you will also
need to use authentication endpoints.

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
