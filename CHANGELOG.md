# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.0.2 (2023-09-07)


### Features

* add dto validation for shop and user ([#7](https://github.com/educata/everrest/issues/7)) ([cc53c0b](https://github.com/educata/everrest/commit/cc53c0b1cc566442749d031696feb73a9d869e79))
* add dummy phones data ([5cc77b5](https://github.com/educata/everrest/commit/5cc77b54da5cf8e7d778d7cf63269af816a271f4))
* add exceptions handling ([929360d](https://github.com/educata/everrest/commit/929360d7fb5725064fab3b5234734848a023da8b))
* add full support for swagger ([#12](https://github.com/educata/everrest/issues/12)) ([c88d1bb](https://github.com/educata/everrest/commit/c88d1bb02881b0803f26cebdfb15cbf724706f53))
* add initial swagger docs ([#8](https://github.com/educata/everrest/issues/8)) ([ba54833](https://github.com/educata/everrest/commit/ba54833dc72a4df52a3caff08216c11637d77de9))
* add logo ([5cf915d](https://github.com/educata/everrest/commit/5cf915d99e3d80a7a66d7b42c1c6ea717c139ccb))
* add mongoose id validation service and custom decorator ([7285507](https://github.com/educata/everrest/commit/7285507d4f06ded2e002d8159b2201420ee75365))
* add mongoose id validation service and decorator ([b00a60b](https://github.com/educata/everrest/commit/b00a60bd1a68221ca8d44dd11dba07f19098f2eb))
* add products modules ([691381b](https://github.com/educata/everrest/commit/691381bc2e0aaa41263966a4ad1fe906fb8586c8))
* added insomnia work environment ([#11](https://github.com/educata/everrest/issues/11)) ([50283b4](https://github.com/educata/everrest/commit/50283b4d9ac4d448d5b7cfc8bd6db93183458679))
* added role based guard and refactored shared folder ([#9](https://github.com/educata/everrest/issues/9)) ([57cb224](https://github.com/educata/everrest/commit/57cb224e8a3bb8ad1a3cfcec1559ae6d76bd0cc5))
* added user/cart/products interfaces and dummy data ([c741fc9](https://github.com/educata/everrest/commit/c741fc9022a1f46cb0cdfce9967df36b041b98b3))
* **auth:** create user schema and base controller/service ([b3b42db](https://github.com/educata/everrest/commit/b3b42db24ff67a2dc2a151c07d4fd6e538205c83))
* **cart:** add checkout endpoint ([57e33bc](https://github.com/educata/everrest/commit/57e33bc07ef28c03bcad4dd6f4307b0fd1a7e8fa))
* **cart:** added boilerplate for cart service/controller ([a1c2eb2](https://github.com/educata/everrest/commit/a1c2eb2cbf44fb3d28954510fe94efc8009ef139))
* **cart:** added cart schema ([bea9143](https://github.com/educata/everrest/commit/bea9143522f970558ed03755649484a9463e02dc))
* **cart:** added clear cart endpoint ([f06774b](https://github.com/educata/everrest/commit/f06774bc3868d78410963735a1eff422f1765362))
* **cart:** added delete endpoint for single cart item ([62b1c16](https://github.com/educata/everrest/commit/62b1c162bdd5c0dca68b9247191212aecaa0399a))
* **cart:** added functional to get cart and init cart ([c91a006](https://github.com/educata/everrest/commit/c91a0069a38b64b341c04945fbf5bb8e9e9b4f17))
* **cart:** added updateCart ([b4ec443](https://github.com/educata/everrest/commit/b4ec44323cabc665d5a541a48c3ed1270f76adad))
* **cart:** added validation if quantity is more than stock ([c13f39a](https://github.com/educata/everrest/commit/c13f39a7084dc4b4503965c46d806730976dc91d))
* modified error handling with new catch error, added some dto and enums ([7763ac6](https://github.com/educata/everrest/commit/7763ac65ea1acf8d712309cda07c4df691f61994))
* **shared:** added custom decorator to decode jwt data ([af2331f](https://github.com/educata/everrest/commit/af2331fd02646efdda182288e239b4ea8f78d2cf))
* **shop:** add getProductById and updateProduct endpoints ([3eb62b9](https://github.com/educata/everrest/commit/3eb62b999a5ffc4873739a760e0c7f21c4916db1))
* **shop:** add pagination to some endpoints ([3c76eda](https://github.com/educata/everrest/commit/3c76eda482ca7f44d6aec2ed32d7cbc952e7615f))
* **shop:** add some data with modified get all endpoint ([22c16e4](https://github.com/educata/everrest/commit/22c16e473a3dc157a8ff3f7d0a0d4a9972f37d22))
* **shop:** added delete endpoint ([e26f64a](https://github.com/educata/everrest/commit/e26f64a4ef33e8d67cbb973534ae4cffbdc0f3b9))
* **shop:** added pagination to all product endpoint ([210ceab](https://github.com/educata/everrest/commit/210ceabb68c053ed8825dac8b1976489ef061812))
* **shop:** added search endpoint ([84e4ae8](https://github.com/educata/everrest/commit/84e4ae84ab8df26ffc7bb3f4142b24184b3194e2))
* **shop:** added search endpoint with pagination ([d10b34d](https://github.com/educata/everrest/commit/d10b34d501745576204800b56e5c75017c42817a))
* **shop:** added updateProductRating endpoint ([90c7251](https://github.com/educata/everrest/commit/90c725164c7bcffc9cba8f13bf7853db6f3cccee))
* **shop:** exclude ratings from products response ([62673cf](https://github.com/educata/everrest/commit/62673cf5d577ba524b3d9dbbe934a56d0b4c735b))
* **shop:** mark id params for future middleware implementation ([e751dea](https://github.com/educata/everrest/commit/e751deac9023b280f28413e3b7f88fa6b4655967))
* **shop:** mark new rating feature for future implementation ([b254b6f](https://github.com/educata/everrest/commit/b254b6f1145482a88f668744153ab68e64da8fc7))
* **user:** add sign up endpoint ([415b335](https://github.com/educata/everrest/commit/415b3356899c04b4daf9bd62dd222c4593c67124))
* **user:** added user endpoints ([#5](https://github.com/educata/everrest/issues/5)) ([10c9fb9](https://github.com/educata/everrest/commit/10c9fb96216801deea41b515e5c8920d4d505b36))
* **user:** updated jwt guard ([#6](https://github.com/educata/everrest/issues/6)) ([c7b949c](https://github.com/educata/everrest/commit/c7b949c8e53b55c8cb34486120b1799b2ebf332f))
* **user:** WIP user jwt auth ([b32aa8d](https://github.com/educata/everrest/commit/b32aa8dca2cbce729bd5fd0bce8414a65f1234c1))


### Bug Fixes

* **auth:** process env reading in other module & refactored jwt guard ([3b57162](https://github.com/educata/everrest/commit/3b571620bdeb38a744f21c839be5a86e069a744c))
* **cart:** fixed total object values ([5de7f43](https://github.com/educata/everrest/commit/5de7f4395d5ecccba4d52f84e4a59b4ff538b2db))
* **cart:** handled beforeDiscount price ([102ec87](https://github.com/educata/everrest/commit/102ec87576dd6363957ad41808f8cae4a36e4ee1))
* file name typo ([168299e](https://github.com/educata/everrest/commit/168299ee890427fe989112c73280b84f059341d9))
* **products:** categories using name ([e7fed08](https://github.com/educata/everrest/commit/e7fed0899cfe08889ffc26fdcdf20269dff1e2fc))
* **shop:** add handle for search case (min,max) ([d46ce7f](https://github.com/educata/everrest/commit/d46ce7fe0bb9800cbf9444ae95489314d755d0d4))
* **shop:** getCategoryById and getCategories endpoints ([874d3f8](https://github.com/educata/everrest/commit/874d3f83f10a00835987f4427c14aa71faee8a7b))
* **user:** correct user interface and added user schema ([8072894](https://github.com/educata/everrest/commit/807289409ce393c7fa892d141773f3845adef4e9))