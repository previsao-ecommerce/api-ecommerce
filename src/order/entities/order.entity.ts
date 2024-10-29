import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from 'src/utils/enums/order-status.enum';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderItemEntity } from 'src/orderItem/entities/order-item.entity';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  user_id: string;
  @Column({ name: 'observation', type: 'varchar', nullable: true })
  observation: string;
  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
  })
  status: OrderStatus;
  @Column({ name: 'total', type: 'decimal', precision: 10, scale: 2 })
  total: number;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItemEntity[];
}
