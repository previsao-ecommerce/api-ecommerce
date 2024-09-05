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

  @Roles(UserType.User, UserType.Admin)
  @Post()
  async create(
    @Body() createdCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.create(createdCategory);
  }

  @Roles(UserType.User, UserType.Admin)
  @Get()
  async getAll(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.getAll()).map(
      (categoryEntity) => new ReturnCategoryDto(categoryEntity),
    );
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
