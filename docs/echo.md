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
  'https://api.everrest.educata.dev/echo/json' \
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
  'https://api.everrest.educata.dev/echo/html' \
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
    <!-- Meta & Link tags -->
    <style>
      /* Global styles */
    </style>
  </head>

  <body>
    <main>
      <style>
        /* Echo styles */
      </style>
      <div class="card">
        <h2>Echo of EverREST</h2>
        <hr />

        <div class="elements">
          <h4>Key_one :</h4>
          <p>value</p>
        </div>

        <div class="elements">
          <h4>Key_two :</h4>
          <p>420</p>
        </div>

        <hr />
        <h6>
          Copyright © 2023-present
          <a href="https://everrest.educata.dev/" target="_blank">Educata</a>
        </h6>
      </div>
    </main>
  </body>
</html>
```
