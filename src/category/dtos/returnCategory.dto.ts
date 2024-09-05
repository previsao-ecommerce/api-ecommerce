import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategoryDto {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor(categoryEntity: CategoryEntity) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;

    this.created_at = categoryEntity.created_at;
    this.updated_at = categoryEntity.updated_at;
  }
}
