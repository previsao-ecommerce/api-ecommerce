import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { ProductEntity } from '../entities/product.entity';
import { ReturnCategoryDto } from 'src/category/dtos/returnCategory.dto';

export class ReturnProductDto {
  id: string;
  name: string;
  description: string;
  category_id?: string;
  images?: string[];
  currency: string;
  price: number;
  promotion_price?: number;
  archived: boolean;
  featured: boolean;
  active: boolean;
  category?: ReturnCategoryDto;
  created_at: Date;
  updated_at: Date;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.description = productEntity.description;
    this.category_id = productEntity.category_id;
    this.images = productEntity.images;
    this.currency = productEntity.currency;
    this.price = productEntity.price;
    this.promotion_price = productEntity.promotion_price;
    this.archived = productEntity.archived;
    this.featured = productEntity.featured;
    this.active = productEntity.active;
    this.created_at = productEntity.created_at;
    this.updated_at = productEntity.updated_at;

    this.category = productEntity.category
      ? new ReturnCategoryDto(productEntity.category)
      : undefined;
  }
}
