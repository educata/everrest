# Product

In the product module users can obtain product data. Almost all endpoints support pagination.

Base URL:

```
https://api.everrest.educata.dev/shop/products
```

## Paginate

### Example

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
Every paginated dataset can be modified using `queries` for `page` and `limit`. For example: `https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=2`
:::

## All product

- Method: `GET`
- URL: `https://api.everrest.educata.dev/shop/products/all`

### Query Params

- `page_size`: number
- `page_index`: number

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

## Product by Id

- Method: `GET`
- URL: `https://api.everrest.educata.dev/shop/products/id/{id}`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/shop/products/id/64edc5b96ad1cbae75d3025a' \
  -H 'accept: application/json'
```

### Response

```json
{
  "price": {
    "current": 1899,
    "currency": "GEL",
    "beforeDiscount": 1899,
    "discountPercentage": 0
  },
  "category": {
    "id": "1",
    "name": "laptops",
    "image": "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png"
  },
  "_id": "64edc5b96ad1cbae75d3025a",
  "title": "Asus TUF Gaming F15 (FX506LHB-HN323) - Black",
  "description": "Geared for serious gaming and real-world durability, the TUF Gaming F15 is a fully-loaded Windows 10 Pro gaming laptop that can carry you to victory. Powered by the latest 10th Gen Intel® Core™ i7 CPU and GeForce® GTX 1660 Ti GPU, action-packed gameplay is fast, fluid, and fully saturates speedy IPS-level displays up to 144Hz.",
  "issueDate": "2022-01-31T20:00:00.000Z",
  "thumbnail": "https://alta.ge/images/thumbnails/900/650/detailed/254/120150_1.jpg.jpg",
  "stock": 10,
  "rating": 5,
  "brand": "asus",
  "warranty": 16,
  "images": [
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_2_m7yx-ml.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_3_823p-ed.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_4_56ny-vf.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_5_7qso-zp.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_7_2631-4q.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_8_nctr-27.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_9_58ds-69.jpg.jpg"
  ],
  "ratings": [
    {
      "userId": "64eccb55fe7b573c1ec5aaae",
      "value": 5,
      "createdAt": "2023-09-27T03:41:57.092Z"
    }
  ]
}
```

## Search

- Method: `GET`
- URL: `https://api.everrest.educata.dev/shop/products/search`

### Query Params

- `page_size`: number
- `page_index`: number
- `keywords`: string
- `category_id`: string
- `brand`: string
- `rating`: number
- `price_min`: number
- `price_max`: number
- `sort_by`: `"rating"`, `"price"`, `"isse_date"`, `"title"`
- `sort_direction`: `"asc"`, `"desc"`

::: info NOTE
if you want to use `sort_by` or `sort_direction`, you should use
both, they are interdependant params.
:::

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/shop/products/search?page_size=1' \
  -H 'accept: */*'
```

### Response

```json
{
  "total": 10,
  "limit": 1,
  "page": 1,
  "sortedBy": "price.current",
  "sortedDirection": "asc",
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

## Categories

- Method: `GET`
- URL: `https://api.everrest.educata.dev/shop/products/categories`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/shop/products/categories' \
  -H 'accept: application/json'
```

### Response

```json
[
  {
    "id": "1",
    "name": "laptops",
    "image": "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png"
  },
  {
    "id": "2",
    "name": "phones",
    "image": "https://cdn-icons-png.flaticon.com/512/0/191.png"
  }
]
```

## Category by Id

- Method: `GET`
- URL: `https://api.everrest.educata.dev/shop/products/category/{category_id}`

### Query Params

- `page_size`: number
- `page_index`: number

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/shop/products/category/1?page_size=1' \
  -H 'accept: */*'
```

### Response

```json
{
  "total": 5,
  "limit": 1,
  "page": 1,
  "skip": 0,
  "products": [
    {
      "price": {
        "current": 1899,
        "currency": "GEL",
        "beforeDiscount": 1899,
        "discountPercentage": 0
      },
      "category": {
        "id": "1",
        "name": "laptops",
        "image": "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png"
      },
      "_id": "64edc5b96ad1cbae75d3025a",
      "title": "Asus TUF Gaming F15 (FX506LHB-HN323) - Black",
      "description": "Geared for serious gaming and real-world durability, the TUF Gaming F15 is a fully-loaded Windows 10 Pro gaming laptop that can carry you to victory. Powered by the latest 10th Gen Intel® Core™ i7 CPU and GeForce® GTX 1660 Ti GPU, action-packed gameplay is fast, fluid, and fully saturates speedy IPS-level displays up to 144Hz.",
      "issueDate": "2022-01-31T20:00:00.000Z",
      "thumbnail": "https://alta.ge/images/thumbnails/900/650/detailed/254/120150_1.jpg.jpg",
      "stock": 10,
      "rating": 0,
      "brand": "asus",
      "warranty": 16,
      "images": [
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_2_m7yx-ml.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_3_823p-ed.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_4_56ny-vf.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_5_7qso-zp.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_7_2631-4q.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_8_nctr-27.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_9_58ds-69.jpg.jpg"
      ]
    }
  ]
}
```

## Brands

- Method: `GET`
- URL: `https://api.everrest.educata.dev/shop/products/brands`

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/shop/products/brands' \
  -H 'accept: application/json'
```

### Response

```json
["asus", "samsung", "xiaomi", "apple", "honor", "oneplus", "lenovo"]
```

## Brand by Name

- Method: `GET`
- URL: `https://api.everrest.educata.dev/shop/products/brand/{brand_name}`

### Query Params

- `page_size`: number
- `page_index`: number

### Example

```sh
curl -X 'GET' \
  'https://api.everrest.educata.dev/shop/products/brand/asus?page_size=1' \
  -H 'accept: */*'
```

### Response

```json
{
  "total": 3,
  "limit": 1,
  "page": 1,
  "skip": 0,
  "products": [
    {
      "price": {
        "current": 1899,
        "currency": "GEL",
        "beforeDiscount": 1899,
        "discountPercentage": 0
      },
      "category": {
        "id": "1",
        "name": "laptops",
        "image": "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png"
      },
      "_id": "64edc5b96ad1cbae75d3025a",
      "title": "Asus TUF Gaming F15 (FX506LHB-HN323) - Black",
      "description": "Geared for serious gaming and real-world durability, the TUF Gaming F15 is a fully-loaded Windows 10 Pro gaming laptop that can carry you to victory. Powered by the latest 10th Gen Intel® Core™ i7 CPU and GeForce® GTX 1660 Ti GPU, action-packed gameplay is fast, fluid, and fully saturates speedy IPS-level displays up to 144Hz.",
      "issueDate": "2022-01-31T20:00:00.000Z",
      "thumbnail": "https://alta.ge/images/thumbnails/900/650/detailed/254/120150_1.jpg.jpg",
      "stock": 10,
      "rating": 0,
      "brand": "asus",
      "warranty": 16,
      "images": [
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_2_m7yx-ml.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_3_823p-ed.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_4_56ny-vf.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_5_7qso-zp.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_7_2631-4q.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_8_nctr-27.jpg.jpg",
        "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_9_58ds-69.jpg.jpg"
      ]
    }
  ]
}
```

## Rate

- Method: `POST`
- URL: `https://api.everrest.educata.dev/shop/products/rate`

### Body

- `productId`: string
- `rate`: string

### Example

```sh
curl -X 'POST' \
  'https://api.everrest.educata.dev/shop/products/rate' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_token_here>' \
  -d '{
  "productId": "64edc5b96ad1cbae75d3025a",
  "rate": 5
}'
```

::: info NOTE
Requires access token attatched either to cookies or `Authorization` header.
:::

### Response

```json
{
  "price": {
    "current": 1899,
    "currency": "GEL",
    "beforeDiscount": 1899,
    "discountPercentage": 0
  },
  "category": {
    "id": "1",
    "name": "laptops",
    "image": "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png"
  },
  "_id": "64edc5b96ad1cbae75d3025a",
  "title": "Asus TUF Gaming F15 (FX506LHB-HN323) - Black",
  "description": "Geared for serious gaming and real-world durability, the TUF Gaming F15 is a fully-loaded Windows 10 Pro gaming laptop that can carry you to victory. Powered by the latest 10th Gen Intel® Core™ i7 CPU and GeForce® GTX 1660 Ti GPU, action-packed gameplay is fast, fluid, and fully saturates speedy IPS-level displays up to 144Hz.",
  "issueDate": "2022-01-31T20:00:00.000Z",
  "thumbnail": "https://alta.ge/images/thumbnails/900/650/detailed/254/120150_1.jpg.jpg",
  "stock": 10,
  "rating": 5,
  "brand": "asus",
  "warranty": 16,
  "images": [
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_2_m7yx-ml.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_3_823p-ed.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_4_56ny-vf.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_5_7qso-zp.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_7_2631-4q.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_8_nctr-27.jpg.jpg",
    "https://alta.ge/images/thumbnails/900/650/detailed/254/119469_9_58ds-69.jpg.jpg"
  ],
  "ratings": [
    {
      "userId": "64eccb55fe7b573c1ec5aaae",
      "value": 5,
      "createdAt": "2023-09-27T03:41:57.092Z"
    }
  ]
}
```
