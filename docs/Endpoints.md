# Online Shop

These
endpoints allow you to retrieve all products, or a single product by
its id. The response will be an array of JSON objects if you request all
products, or a single JSON object if you request a single product.

## [The Online Shop model](https://docs.noroff.dev/docs/v2/basic/online-shop#the-online-shop-model)

| Prop | Type | Default |
| --- | --- | --- |
| id | string | - |
| title | string | - |
| description | string | - |
| price | float | - |
| discountedPrice | float | - |
| image | object | - |
| rating | integer | - |
| tags | Array<string> | - |
| reviews | Array<Review> | - |

## [All products](https://docs.noroff.dev/docs/v2/basic/online-shop#all-products)

GET/online-shop

Retrieve all online shop products and its associated reviews.

Response

```json
{
  "data": [
    {
      "id": "159fdd2f-2b12-46de-9654-d9139525ba87",
      "title": "Gold headphones",
      "description": "Professional headphones with gold trim.",
      "price": 449.99,
      "discountedPrice": 382.49,
      "image": {
        "url": "https://static.cloud.noroff.dev/api/online-shop/3-headphones-beats.jpg",
        "alt": "Gold headphones laying on a white background"
      },
      "rating": 4,
      "tags": ["headphones"],
      "reviews": [
        {
          "id": "88e11191-d2e5-4bfb-9bcb-d7e158284657",
          "username": "Michael J.",
          "rating": 4,
          "description": "Good sound quality."
        }
      ]
    },
    {
      "id": "109566af-c5c2-4f87-86cb-76f36fb8d378",
      "title": "Vanilla Perfume",
      "description": "Women's perfume that smells a warm and sweet, with nuances of wood and jasmine.",
      "price": 2599.99,
      "discountedPrice": 2079.99,
      "image": {
        "url": "https://static.cloud.noroff.dev/api/online-shop/1-perfume-white.jpg",
        "alt": "White perfume bottle on a yellow background"
      },
      "rating": 5,
      "tags": ["perfume", "beauty"],
      "reviews": [
        {
          "id": "90a61e3e-355a-42e4-b038-d91dcad33c20",
          "username": "Jim N.",
          "rating": 5,
          "description": "My partner loves it, its her favourite."
        }
      ]
    }
  ],
  "meta": {
    "isFirstPage": true,
    "isLastPage": true,
    "currentPage": 1,
    "previousPage": null,
    "nextPage": null,
    "pageCount": 1,
    "totalCount": 2
  }
}
```

---

## [Single product](https://docs.noroff.dev/docs/v2/basic/online-shop#single-product)

GET/online-shop/<id>

Retrieve a single online shop product and its associated reviews by product id.

Response

```json
{
  "data": {
    "id": "159fdd2f-2b12-46de-9654-d9139525ba87",
    "title": "Gold headphones",
    "description": "Professional headphones with gold trim.",
    "price": 449.99,
    "discountedPrice": 382.49,
    "image": {
      "url": "https://static.cloud.noroff.dev/api/online-shop/3-headphones-beats.jpg",
      "alt": "Gold headphones laying on a white background"
    },
    "rating": 4,
    "tags": ["headphones"],
    "reviews": [
      {
        "id": "88e11191-d2e5-4bfb-9bcb-d7e158284657",
        "username": "Michael J.",
        "rating": 4,
        "description": "Good sound quality."
      }
    ]
  },
  "meta": {}
}
```