# Quote

In the quote module, users can retrieve quotes from games, series, books, and other sources. For fun, users can get a random quote or view all quotes through paginated data.

Base URL:

```
https://api.everrest.educata.dev/quote
```

## Paginate

### Example

```json
{
  "total": 22,
  "limit": 5,
  "page": 1,
  "skip": 0,
  "quotes": [...]
}
```

::: tip Tip
Every paginated dataset can be modified using `queries` for `page` and `limit`. For example: `https://api.everrest.dev/quotes?page_index=1&page_size=2`
:::

## All Quote

- Method: `GET`
- URL: `https://api.everrest.dev/quote`

### Query Params

- `page_size`: number
- `page_index`: number
- `author`: string
- `keywords`: string
- `type`: string

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/quote?page_size=2' \
  -H 'accept: */*'
```

### Response

```json
{
  "total": 22,
  "limit": 2,
  "page": 1,
  "skip": 0,
  "quotes": [
    {
      "_id": "6519cd7f929ed74cefd22aa7",
      "author": "Arthur Morgan",
      "quote": "Vengeance is an idiot’s game",
      "type": "Game"
    },
    {
      "_id": "6519ceae929ed74cefd22aad",
      "author": "Raymond Reddington",
      "quote": "The true measure of a man isn't what he reveals to the world but what he hides from it",
      "type": "Series"
    }
  ]
}
```

## Random Quote

- Method: `GET`
- URL: `https://api.everrest.dev/quote/random`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/quote/random' \
  -H 'accept: application/json'
```

### Response

```json
{
  "_id": "6519d2720864685c996df10b",
  "author": "Geralt Of Rivia",
  "quote": "If I’m to choose between one evil and another, I’d rather not choose at all",
  "type": "Game"
}
```
