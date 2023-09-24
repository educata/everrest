# Product

In the product module, users can obtain different types of products with paginated data, which means that almost all the returned data will be paginated.

Base URL:

```
https://api.everrest.educata.dev/shop/product
```

## Paginate

Paginated response example:

```json
{
  "total": 100,
  "limit": 5,
  "page": 1,
  "skip": 0,
  "products": [...]
}
```
::: tip Tip
Every paginated dataset can be modified using `queries` for `page` and `limit`.    For example: `https://api.everrest.dev/shop/product/all?page_index=1&page_size=2`
:::

## All product

- Method: `GET`
- URL: `https://api.everrest.dev/shop/product/all`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=1' \
  -H 'accept: */*'
```

### Response

```json
{
  "total": 10,
  "limit": 1,
  "page": 1,
  "skip": 0,
  "products": [
    {
      "price": {
        "current": 799,
        "currency": "GEL",
        "beforeDiscount": 1019,
        "discountPercentage": 21
      },
      "category": {
        "id": "2",
        "name": "phones",
        "image": "https://cdn-icons-png.flaticon.com/512/0/191.png"
      },
      "_id": "64edc5b96ad1cbae75d30260",
      "title": "Samsung A546E Galaxy A54 (6GB/128GB) Dual Sim LTE/5G - Black",
      "description": "Affordable hight quality Samsung smartphone.",
      "issueDate": "2023-08-29T10:17:29.326Z",
      "thumbnail": "https://alta.ge/images/thumbnails/900/650/detailed/279/11_s2p2-m2.png.jpg",
      "stock": 790,
      "rating": 4.2,
      "brand": "samsung",
      "warranty": 12,
      "images": [
        "https://alta.ge/images/thumbnails/900/650/detailed/279/11_s2p2-m2.png.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/279/1_34al-1v.png.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/279/download_%281%29.png.jpg"
      ]
    }
  ]
}
```

::: info NOTE
You can paginate the data or increase the page size by adding queries. Read more at: <a href="#paginate">Paginate</a>.
:::