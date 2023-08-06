# EverREST project endpoints for clients

## Language

prefix - /`lang`

- `GET` lang/errors

## User

prefix - /`user`

- `GET` user
- `GET` user/:id | (minimal) | jwt
- `POST` user/sign_up | { ... }
- `POST` user/sign_in | { email, password }
- `POST` user/verify_email | { email }
- `POST` user/recovery | { email }
- `PATCH` user/update | { ... } | jwt
- `PATCH` user/change_password | { oldPassword, newPassword } | jwt
- `DELETE` user/delete | jwt

## Shop

prefix - /`shop`/`...`

### Products

- `GET` products (endpoint list)
- `GET` products/all
- `GET` products/search?=q (name/id/rate/categor/price_min/price_max)
- `GET` products/categories
- `GET` products/category/:category_name
- `GET` products/brands
- `GET` products/brand/:brand_name
- `POST` products/rate | { id, rate }

### Cart

- `GET` cart | (currnet user cart) | jwt
- `POST` cart/product | { id, quantity } | jwt
- `POST` cart/checkout | jwt
- `PATCH` cart/product | { id, quantity } | jwt
- `DELETE` cart/product | { id } | jwt
