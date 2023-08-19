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
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  PaginationProductQueryDto,
  CreateProductDto,
  SearchProductsQueryDto,
  UpdateProductDto,
  UpdateRatingProductDto,
} from '../dtos';
import { JwtGuard } from 'src/shared';

@Controller('shop/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('id/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Patch('id/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @UseGuards(JwtGuard)
  @Post('rate')
  updateProductRating(
    @Body() updateProductDto: UpdateRatingProductDto,
    @Request() req,
  ) {
    return this.productsService.updateProductRating(updateProductDto, req.user);
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
