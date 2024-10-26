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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { CategoryEntity } from './entities/category.entity';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/utils/enums/user-type.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createdCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.create(createdCategory);
  }

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    items: ReturnCategoryDto[];
    total: number;
    pageTotal: number;
    page: number;
    limit: number;
  }> {
    const { categories, total, pageTotal } = await this.categoryService.getAll(
      page,
      limit,
    );

    return {
      items: categories.map(
        (categoryEntity) => new ReturnCategoryDto(categoryEntity),
      ),
      total,
      pageTotal,
      page,
      limit,
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(await this.categoryService.getById(id));
  }

  @Put()
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.categoryService.update(updateCategoryDto),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
