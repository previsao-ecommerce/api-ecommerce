import { AddressEntity } from 'src/address/entities/address.entity';
import { UserType } from 'src/utils/enums/user-type.enum';
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

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 40, nullable: false })
  name: string;
  @Column({ name: 'cpf_cnpj', length: 14, nullable: false })
  cpf_cnpj: string;
  @Column({ name: 'email', length: 40, nullable: false })
  email: string;
  @Column({ name: 'password', length: 100, nullable: false })
  password: string;
  @Column({ name: 'address_id', type: 'uuid', nullable: false })
  address_id: string;
  @Column({ name: 'phone', nullable: false })
  phone: string;
  @Column({ name: 'image_url', nullable: true })
  image_url?: string;
  @Column({
    name: 'user_type',
    type: 'enum',
    enum: UserType,
    nullable: false,
  })
  user_type: UserType;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => AddressEntity, (address) => address.user)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;
}
