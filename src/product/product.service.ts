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
import axios from 'axios';
import { AuthGuard } from 'src/guards/auth.guard';

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

  async getAll(
    name?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ products: ProductEntity[]; total: number; pageTotal: number }> {
    const { data: topSellingCategories } = await axios.get(
      'http://localhost:8000/orders/count/categories',
    );
    const categoryRanking = topSellingCategories.map(
      (cat) => cat.product_category_name,
    );

    const where = name ? { name: ILike(`%${name}%`) } : {};

    const [products, total] = await this.productRepository.findAndCount({
      where: { ...where, archived: false },
      relations: ['category'],
    });

    const sortedProducts = products.sort((a, b) => {
      const rankA = categoryRanking.indexOf(a.category.name);
      const rankB = categoryRanking.indexOf(b.category.name);

      // Se a categoria não está no ranking, ela recebe uma prioridade menor
      return (
        (rankA === -1 ? Infinity : rankA) - (rankB === -1 ? Infinity : rankB)
      );
    });

    const paginatedProducts = sortedProducts.slice(
      (page - 1) * limit,
      page * limit,
    );

    return {
      products: paginatedProducts,
      total,
      pageTotal: paginatedProducts.length,
    };
  }

  async getAllLogged(
    name?: string,
    page: number = 1,
    limit: number = 10,
    customerStateId?: number,
    price?: number,
    reviewScore?: number,
    productCategoryId?: number,
  ): Promise<{ products: ProductEntity[]; total: number; pageTotal: number }> {
    // Chama a API de recomendações para obter as categorias recomendadas
    const { data: recommendations } = await axios.get(
      'http://localhost:8000/recommendations',
      {
        params: {
          customer_state_id: customerStateId,
          price,
          review_score: reviewScore,
          product_category_id: productCategoryId,
        },
      },
    );

    // Ordena as categorias recomendadas pela distância ao centroid (menor distância = maior prioridade)
    const recommendedCategories = recommendations.recomendacoes
      .sort((a, b) => a.distancia_ao_centroid - b.distancia_ao_centroid)
      .map((rec) => rec.product_category_name);

    // Cria a condição de busca para o nome do produto, caso exista
    const where = name ? { name: ILike(`%${name}%`) } : {};

    // Busca os produtos e o total, sem considerar a ordem de recomendação ainda
    const [products, total] = await this.productRepository.findAndCount({
      where: { ...where, archived: false },
      relations: ['category'],
    });

    // Ordena os produtos conforme a prioridade das categorias recomendadas
    const sortedProducts = products.sort((a, b) => {
      const rankA = recommendedCategories.indexOf(a.category.name);
      const rankB = recommendedCategories.indexOf(b.category.name);

      // Se a categoria não está no ranking, ela recebe uma prioridade menor
      return (
        (rankA === -1 ? Infinity : rankA) - (rankB === -1 ? Infinity : rankB)
      );
    });

    // Aplica a paginação
    const paginatedProducts = sortedProducts.slice(
      (page - 1) * limit,
      page * limit,
    );

    return {
      products: paginatedProducts,
      total,
      pageTotal: paginatedProducts.length,
    };
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
