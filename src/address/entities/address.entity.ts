import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cep', type: 'varchar', length: 10, nullable: false })
  cep: string;

  @Column({ name: 'street', type: 'varchar', length: 40, nullable: false })
  street: string;

  @Column({ name: 'number', type: 'int', nullable: false })
  number: number;

  @Column({ name: 'district', type: 'varchar', length: 40, nullable: false })
  district: string;

  @Column({ name: 'city', type: 'varchar', length: 40, nullable: false })
  city: string;

  @Column({ name: 'state', type: 'varchar', length: 40, nullable: false })
  state: string;

  @Column({ name: 'complement', type: 'varchar', length: 40, nullable: true })
  complement: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => UserEntity, (user) => user.address_id)
  user: UserEntity;
}
