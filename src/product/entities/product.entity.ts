import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 40, nullable: false })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  description: string;

  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  category_id: string;

  @Column({ name: 'images', type: 'varchar', array: true, nullable: true })
  images: string[];

  @Column({ name: 'currency', type: 'varchar', length: 3, nullable: false })
  currency: string;

  @Column({ name: 'price', type: 'float', nullable: false })
  price: number;

  @Column({ name: 'promotion_price', type: 'float', nullable: true })
  promotion_price: number;

  @Column({ name: 'featured', type: 'boolean', nullable: false })
  featured: boolean;

  @Column({ name: 'archived', type: 'boolean', nullable: false })
  archived: boolean;

  @Column({ name: 'active', type: 'boolean', nullable: false })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;
}
