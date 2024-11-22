import { ProductEntity } from 'src/product/entities/product.entity';
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
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id', type: 'uuid', nullable: false })
  order_id: string;

  @Column({ name: 'product_id', type: 'uuid', nullable: false })
  product_id: string;

  @Column({ name: 'product_category_id', type: 'uuid', nullable: false })
  product_category_id: string;

  @Column({ name: 'product_category_number', type: 'integer', nullable: true })
  product_category_number: number;

  @Column({ name: 'quantity', type: 'integer', nullable: false })
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @Column({ name: 'total', type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
