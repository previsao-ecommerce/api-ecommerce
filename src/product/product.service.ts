import {
  ConflictException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import { RequestOptions } from 'https';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDTO: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { name: createProductDTO.name },
    });

    if (product) {
      throw new ConflictException(
        `Produto com o nome ${createProductDTO.name} já existe`,
      );
    }

    return this.productRepository.save({
      ...createProductDTO,
    });
  }

  async getAll(name?: string, page: number = 1, limit: number = 10): Promise<{ products: ProductEntity[], total: number, pageTotal: number }> {
    const where = name ? { name: ILike(`%${name}%`) } : {};
  
    const [products, total] = await this.productRepository.findAndCount({
      where: { ...where, archived: false },
      relations: ['category'],
      take: limit,
      skip: (page - 1) * limit,
    });
  
    return { products, total, pageTotal: products.length }; 
  }
  

  async getById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(updateProductDTO: UpdateProductDTO): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: updateProductDTO.id },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto não encontrado com o id: ${updateProductDTO.id}`,
      );
    }

    return this.productRepository.save({
      ...product,
      ...updateProductDTO,
    });
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto não encontrado com o id: ${id}`);
    }

    await this.productRepository.remove(product);
  }
}
