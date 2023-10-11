export enum ExceptionStatusKeys {
  NotFound = 'errors.not_found',
  Forbidden = 'errors.forbidden',
  BadRequest = 'errors.bad_request',
  PaymentRequired = 'errors.payment_required',
  Unauthorized = 'errors.unauthorized',
  Conflict = 'errors.conflict',
  Teapot = 'errors.teapot',
  ContentTooLarge = 'errors.content_too_large',
  UnsupportedMediaType = 'errors.unsupported_media_type',
  EnhanceYourCalm = 'errors.enhance_your_calm',
}

export enum ProductExceptionKeys {
  ProductAlreadyExists = 'errors.product_already_exists',
  ProductNotFound = 'errors.product_not_found',
  NotEnughStockToPurchase = 'errors.not_enough_stock_to_purchase',
  ProductOutOfStockBeforeCheckout = 'errors.product_out_of_stock_before_checkout',
  RatingNotNumber = 'errors.rating_not_number',
  RatingTooLow = 'errors.rating_too_low',
  RatingTooHigh = 'errors.rating_too_high',
  PriceMinNotNumber = 'errors.price_min_not_number',
  PriceMinTooLow = 'errors.price_min_too_low',
  PriceMinTooHigh = 'errors.price_min_too_high',
  PriceMaxNotNumber = 'errors.price_max_not_number',
  PriceMaxTooLow = 'errors.price_max_too_low',
  PriceMaxTooHigh = 'errors.price_max_too_high',
  IncorrectSortBy = 'errors.incorrect_sort_by',
  IncorrectSortDirection = 'errors.incorrect_sort_direction',
  InvalidTitle = 'errors.invalid_title',
  InvalidBrand = 'errors.invalid_brand',
  InvalidStock = 'errors.invalid_stock',
  InvalidImages = 'errors.invalid_images',
  InvalidRating = 'errors.invalid_rating',
  InvalidWarranty = 'errors.invalid_warranty',
  InvalidDate = 'errors.invalid_date',
  InvalidThumbnail = 'errors.invalid_thumbnail',
  InvalidDescription = 'errors.invalid_description',
  InvalidCurrency = 'errors.invalid_currency',
  InvalidCurrentPrice = 'errors.invalid_current_price',
  InvalidBeforeDiscountPrice = 'errors.invalid_before_discount_price',
  InvalidCategoryName = 'errors.invalid_category_name',
  InvalidCategoryImage = 'errors.invalid_category_image',
  InvalidQuantity = 'errors.invalid_quantity',
  DateNotIsoFormat = 'errors.date_not_iso_format',
  ThumbnailNotUrl = 'errors.thumbnail_not_url',
  StockTooLow = 'errors.stock_too_low',
  DiscountTooHigh = 'errors.discount_too_high',
  DiscountTooLow = 'errors.discount_too_low',
  WarrantyMustBeNumber = 'errors.warranty_must_be_number',
  QuantityMustBeNumber = 'errors.quantity_must_be_number',
}

export enum GlobalExceptionKeys {
  IncorrectMongooseID = 'errors.incorrect_mongoose_id',
  PageIndexNotNumber = 'errors.page_index.not_number',
  PageIndexTooLow = 'errors.page_index.too_low',
  PageSizeNotNumber = 'errors.page_size.not_number',
  PageSizeTooLow = 'errors.page_size.too_low',
  PageSizeTooHigh = 'errors.page_size.too_high',
  EndPointNotFound = 'errors.endpoint_not_found',
  RatingTooHigh = 'errors.rating_too_high',
  RatingTooLow = 'errors.rating_too_low',
}

export enum AuthExpectionKeys {
  IncorrectEmailOrPassword = 'errors.incorrect_email_or_password',
  EmailInUse = 'errors.email_in_use',
  TokenInvalid = 'errors.token_invalid',
  TokenExpired = 'errors.token_expired',
  TokenNotFound = 'errors.token_not_found',
  InvalidEmail = 'errors.invalid_email',
  InvalidAge = 'errors.invalid_age',
  InvalidPassword = 'errors.invalid_password',
  InvalidOldPassword = 'errors.invalid_old_password',
  InvalidChangePassword = 'errors.invalid_change_password',
  InvalidAddress = 'errors.invalid_address',
  InvalidPhoneNumber = 'errors.invalid_phone_number',
  InvalidZipcode = 'errors.invalid_zipcode',
  InvalidAvatar = 'errors.invalid_avatar',
  InvalidGender = 'errors.invalid_gender',
  FirstnameTooLong = 'errors.firstname_too_long',
  FirstnameTooShort = 'errors.firstname_too_short',
  FirstnameShouldBeString = 'errors.firstname_should_be_string',
  LastnameTooLong = 'errors.lastname_too_long',
  LastnameTooShort = 'errors.lastname_too_short',
  LastnameShouldBeString = 'errors.lastname_should_be_string',
  PasswordTooShort = 'errors.password_too_short',
  PasswordTooLong = 'errors.password_too_long',
  TokenContainsIncorrectUser = 'errors.token_contains_incorrect_user',
  TokenContainsIncorrectAction = 'errors.token_contains_incorrect_action',
  AlreadyVerified = 'errors.already_verified',
  OldPasswordIncorrect = 'errors.old_password_incorrect',
  NewPasswordMatchesOld = 'errors.new_password_matches_old',
  UserAlreadyDeleted = 'errors.user_already_deleted',
  UserEmailNotVerified = 'errors.user_email_not_verified',
  UserPermissionNotGranted = 'errors.user_permission_not_granted',
  NothingToUpdate = 'errors.nothing_to_update',
  UserNotFound = 'errors.user_not_found',
  ShouldProvideEmail = 'errors.should_provide_email',
  ShouldProvidePassword = 'errors.should_provide_password',
}

export enum CartExpectionKeys {
  UserHasNoCart = 'errors.user_has_no_cart',
  UserAlreadyHasCart = 'errors.user_already_has_cart',
  ItemNotFoundInCart = 'errors.item_not_found_in_cart',
  CartAlreadyDeleted = 'errors.cart_already_deleted',
}

export enum QRCodeExpectionKeys {
  TextShouldNotBeEmpty = 'errors.text_should_not_be_empty',
  ImageUrlShouldNotBeEmpty = 'errors.image_url_should_not_be_empty',
  TextShouldHaveValue = 'errors.text_should_have_value',
  InvalidImageURL = 'errors.invalid_image_url',
  InvalidImage = 'errors.invalid_image',
  NotConvertable = 'errors.not_convertable_text_to_qr',
}

export enum QuoteExpectionKeys {
  AuthorNameShouldBeString = 'errors.author_name_should_be_string',
  QuoteShouldBeString = 'errors.quote_should_be_string',
  DuplicatedQuote = 'errors.duplicated_quote',
  QuoteKeywordShouldBeString = 'errors.quote_keyword_should_be_string',
  QuoteNotFound = 'errors.quote_not_found',
  QuoteShouldHaveNewData = 'errors.quote_should_have_new_data',
  QuoteTypeShouldBeString = 'errors.quote_type_should_be_string',
}
