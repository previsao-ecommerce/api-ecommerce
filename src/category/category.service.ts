import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryExists = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (categoryExists) {
      throw new ConflictException(
        `Categoria com o nome ${createCategoryDto.name} já cadastrada para este usuário`,
      );
    }

    return await this.categoryRepository.save({
      ...createCategoryDto,
    });
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    categories: CategoryEntity[];
    total: number;
    pageTotal: number;
  }> {
    const [categories, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return { categories, total, pageTotal: categories.length };
  }

  async getById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrado');
    }

    return category;
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: updateCategoryDto.id },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria não encontrado com o id: ${updateCategoryDto.id}`,
      );
    }

    const updatedCategory = await this.categoryRepository.save({
      ...category,
      ...updateCategoryDto,
    });

    return updatedCategory;
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete({ id: id });

    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Categoria não encontrada com o id: ${id}`);
    }

    await this.categoryRepository.remove(category);
  }
}
