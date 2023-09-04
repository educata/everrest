import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  PaginationProductQueryDto,
  CreateProductDto,
  SearchProductsQueryDto,
  UpdateProductDto,
  UpdateProductRatingDto,
} from '../dtos';
import {
  CurrentUser,
  CurrentUserInterceptor,
  JwtGuard,
  Roles,
  RolesGuard,
  MongooseValidatorService,
} from 'src/shared';
import { UserPayload } from 'src/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/enums';

@ApiTags('products')
@Controller('shop/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly mongooseValidator: MongooseValidatorService,
  ) {}

  @Get('id/:id')
  getProductById(@Param('id') id: string) {
    this.mongooseValidator.isValidObjectId(id);
    return this.productsService.getProductById(id);
  }

  @Patch('id/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.mongooseValidator.isValidObjectId(id);
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Post('rate')
  @UseGuards(JwtGuard)
  @UseInterceptors(CurrentUserInterceptor)
  updateProductRating(
    @CurrentUser() user: UserPayload,
    @Body() updateProductDto: UpdateProductRatingDto,
  ) {
    return this.productsService.updateProductRating(updateProductDto, user);
  }

  @Post()
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.addProduct(createProductDto);
  }

  @Get('all')
  getAllProduct(@Query() query: PaginationProductQueryDto) {
    return this.productsService.getAllProductsDetailed(query);
  }

  @Get('search')
  searchProduct(@Query() query: SearchProductsQueryDto) {
    return this.productsService.searchProduct(query);
  }

  @Delete('all')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Admin)
  deleteAllProduct() {
    return this.productsService.deleteAllProduct();
  }

  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get('category/:category_id')
  getProductsByCategoryId(
    @Param('category_id') id: string,
    @Query() query: PaginationProductQueryDto,
  ) {
    return this.productsService.getByCategoryId(id, query);
  }

  @Get('brands')
  getBrands() {
    return this.productsService.getBrands();
  }

  @Get('brand/:brand_name')
  getBrandProducts(
    @Param('brand_name') brandName: string,
    @Query() query: PaginationProductQueryDto,
  ) {
    return this.productsService.getBrandProducts(brandName, query);
  }
}
