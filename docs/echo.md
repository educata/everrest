# Echo

Echo module returns the sender the same request body that was sent to it.
The response can be either json or a simple html document with a code block.

Base URL:

```
https://api.everrest.educata.dev/echo
```

## JSON

- Method: `POST`
- URL: `https://api.everrest.educata.dev/echo/json`

### Example

```sh
curl -X 'POST' \
  'http://localhost:3000/echo/json' \
  -H 'accept: application/json' \
  -d '{
    "key_one": "value",
    "key_two": 420
}'
```

### Response

```json
{
  "key_one": "value",
  "key_two": 420
}
```

## HTML

- Method: `POST`
- URL: `https://api.everrest.educata.dev/echo/html`

### Example

```sh
curl -X 'POST' \
  'http://localhost:3000/echo/html' \
  -H 'accept: text/html' \
  -d '{
    "key_one": "value",
    "key_two": 420
}'
```

### Response

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Echo | EverREST</title>
  </head>
  <body>
<pre>
{
    "key_one": "value",
    "key_two": 420
} 
</pre>
  </body>
</html>
```
