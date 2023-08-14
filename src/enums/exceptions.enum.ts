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
}

export enum ProductPaginationExceptionKeys {
  PageIndexNotNumber = 'errors.page_index.not_number',
  PageIndexTooLow = 'errors.page_index.too_low',
  PageSizeNotNumber = 'errors.page_size.not_number',
  PageSizeTooLow = 'errors.page_size.too_low',
  PageSizeTooHigh = 'errors.page_size.too_high',
}

export enum GlobalExceptionKeys {
  IncorrectMongooseID = 'error.incorrect_mongoose_id',
}
