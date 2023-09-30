# EverREST project endpoints for clients

## Language

prefix - /`lang`

- `GET` lang/errors

## User

prefix - /`user`

- `GET` user | jwt
- `GET` user/id/:id | (minimal) | jwt
- `GET` user/all | (minimal) | jwt
- `POST` user/sign_up | { ... }
- `POST` user/sign_in | { email, password }
- `POST` user/logout | jwt
- `POST` user/verify_email | { email }
- `POST` user/recovery | { email }
- `PATCH` user/update | { ... } | jwt
- `PATCH` user/change_password | { oldPassword, newPassword } | jwt
- `DELETE` user/delete | jwt

## Shop

prefix - /`shop`/`...`

### Products

- `GET` products/all
- `GET` products/search?q (keyword/id/rate/category/brand/price_min/price_max)
- `GET` products/categories
- `GET` products/category/:category_id
- `GET` products/brands
- `GET` products/brand/:brand_name
- `GET` products/rates/:product_id
- `POST` products/rate | { id, rate } | jwt

### Cart

- `GET` cart | (current user cart) | jwt
- `POST` cart/product | { id, quantity } | jwt
- `POST` cart/checkout | jwt
- `PATCH` cart/product | { id, quantity } | jwt
- `DELETE` cart/product | { id } | jwt
- `DELETE` cart | (clear current cart) | jwt

## QrCode

prefix - /`qrcode`

- `GET` qrcode
- `POST` qrcode/generate
- `POST` qrcode/generate_with_image

## Quote

prefix - /`quote`

- `GET` quote?q (author/keyword)
- `GET` quote/random (1)
- `POST` quote { quote, author }
- `PATCH` quote/id { quote, author }
- `DELETE` quote/id