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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { UpdateProductDTO } from './dtos/updateProduct.dto';

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
  async getAll(@Query('name') name?: string): Promise<ReturnProductDto[]> {
    return (await this.productService.getAll(name)).map(
      (productEntity) => new ReturnProductDto(productEntity),
    );
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
