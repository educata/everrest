# Errors

EverREST has enums for error keys across all modules. These error keys can be utilized
to have a dynamic user feedback system that can support internationalization.

## Error Object

By default an English error message is also sent in `error` property but `errorKeys` provide
greater flexibility as the developers can define and fine-tune error messages by themselves.

```json
{
  "error": "Token not found",
  "errorKeys": ["errors.token_not_found"],
  "statusCode": 401,
  "timestamp": "2023-10-08T08:13:15.335Z",
  "path": "/shop/cart",
  "help": "if you think this error should not happen, please create new issue at: https://github.com/educata/everrest/issues",
  "documentation": "https://everrest.educata.dev",
  "swagger": "https://api.everrest.educata.dev/swagger"
}
```

::: info NOTE
`errorKeys` can contain more than one error key.
:::

## Get Error Keys

- Method: `GET`
- URL: `https://api.everrest.educata.dev/lang/errors`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/lang/errors' \
  -H 'accept: application/json'
```

### Response

```json
[
  "errors.not_found",
  "errors.forbidden",
  "errors.bad_request",
  "errors.payment_required",
  "errors.unauthorized",
  "errors.conflict",
  "errors.teapot",
  "errors.content_too_large",
  "errors.unsupported_media_type",
  "errors.enhance_your_calm",
  "errors.incorrect_mongoose_id",
  "errors.page_index.not_number",
  "errors.page_index.too_low",
  "errors.page_size.not_number",
  "errors.page_size.too_low",
  "errors.page_size.too_high",
  "errors.endpoint_not_found",
  "errors.rating_too_high",
  "errors.rating_too_low",
  "errors.product_already_exists",
  "errors.product_not_found",
  "errors.product_stock_outnumbered",
  "errors.product_stock_sold_before_checkout",
  "errors.rating_not_number",
  "errors.price_min_not_number",
  "errors.price_min_too_low",
  "errors.price_min_too_high",
  "errors.price_max_not_number",
  "errors.price_max_too_low",
  "errors.price_max_too_high",
  "errors.incorrect_sort_by",
  "errors.incorrect_sort_direction",
  "errors.invalid_title",
  "errors.invalid_brand",
  "errors.invalid_stock",
  "errors.invalid_images",
  "errors.invalid_rating",
  "errors.invalid_warranty",
  "errors.invalid_date",
  "errors.invalid_thumbnail",
  "errors.invalid_description",
  "errors.invalid_currency",
  "errors.invalid_current_price",
  "errors.invalid_before_discount_price",
  "errors.invalid_category_name",
  "errors.invalid_category_image",
  "errors.invalid_quantity",
  "errors.date_not_iso_format",
  "errors.thumbnail_not_url",
  "errors.stock_too_low",
  "errors.discount_too_high",
  "errors.discount_too_low",
  "errors.warranty_must_be_number",
  "errors.quantity_must_be_number",
  "errors.incorrect_email_or_password",
  "errors.email_in_use",
  "errors.token_invalid",
  "errors.token_expired",
  "errors.token_not_found",
  "errors.invalid_email",
  "errors.invalid_age",
  "errors.invalid_password",
  "errors.invalid_old_password",
  "errors.invalid_change_password",
  "errors.invalid_address",
  "errors.invalid_phone_number",
  "errors.invalid_zipcode",
  "errors.invalid_avatar",
  "errors.invalid_gender",
  "errors.firstname_too_long",
  "errors.firstname_too_short",
  "errors.firstname_should_be_string",
  "errors.lastname_too_long",
  "errors.lastname_too_short",
  "errors.lastname_should_be_string",
  "errors.password_too_short",
  "errors.password_too_long",
  "errors.token_contain_incorrect_user",
  "errors.token_contain_incorrect_action",
  "errors.already_verified",
  "errors.old_password_incorrect",
  "errors.change_passwords_matchs",
  "errors.user_already_deleted",
  "errors.user_email_not_verified",
  "errors.user_permission_not_granted",
  "errors.nothing_to_update",
  "errors.user_not_found",
  "errors.user_cart_not_exists",
  "errors.user_cart_already_exists",
  "errors.cart_do_not_have_this_item",
  "errors.cart_already_deleted",
  "errors.text_should_not_be_empty",
  "errors.image_url_should_not_be_empty"
]
```

## Error Keys Usage Example

You can have messages stored using these error keys in different language formats.
Below is an example to give you the general idea. The practical application of these
keys will depend on your project.

```js
// errors.js
export const ERRORS = {
  en: {
    'errors.user_not_found': 'The user could not be found',
    'errors.password_too_short': 'Password is too short',
  },
  ka: {
    'errors.user_not_found': 'მომხმარებელი ვერ მოიძებნა',
    'errors.password_too_short': 'პაროლი ზედმეტად მოკლეა',
  },
};

export function displayError(errorKey) {
  /* arbitrary error display logic here */
}
```

Depending on the preferred language selected by the user, apropriate message can be displayed.

```js
import { ERRORS, displayError } from 'errors.js';
// example file where prefered language could be managed
import { preferredLang } from 'lang.js';

fetch('api.everrest.educata.dev/auth/123').catch((err) => {
  displayError(ERRORS[preferredLang][err.errorKeys[0]]);
});
```
