import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import { AuthGuard } from 'src/guards/auth.guard';

// @Roles(UserType.User, UserType.Admin)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createdProduct: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.create(createdProduct);
  }

  @Get()
  async getAll(
    @Query('name') name?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    items: ReturnProductDto[];
    total: number;
    pageTotal: number;
    page: number;
    limit: number;
  }> {
    const { products, total, pageTotal } = await this.productService.getAll(
      name,
      page,
      limit,
    );

    return {
      items: products.map(
        (productEntity) => new ReturnProductDto(productEntity),
      ),
      total,
      pageTotal,
      page,
      limit,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/logged')
  async getAllLogged(
    @Query('name') name?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('customer_state_id') customerStateId?: number,
    @Query('price') price?: number,
    @Query('review_score') reviewScore?: number,
    @Query('product_category_id') productCategoryId?: number,
  ): Promise<{
    items: ReturnProductDto[];
    total: number;
    pageTotal: number;
    page: number;
    limit: number;
  }> {
    const { products, total, pageTotal } =
      await this.productService.getAllLogged(
        name,
        page,
        limit,
        customerStateId,
        price,
        reviewScore,
        productCategoryId,
      );

    return {
      items: products.map(
        (productEntity) => new ReturnProductDto(productEntity),
      ),
      total,
      pageTotal,
      page,
      limit,
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ReturnProductDto> {
    return new ReturnProductDto(await this.productService.getById(id));
  }

  @Put()
  async update(
    @Body() updateProductDto: UpdateProductDTO,
  ): Promise<ReturnProductDto> {
    return new ReturnProductDto(
      await this.productService.update(updateProductDto),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
