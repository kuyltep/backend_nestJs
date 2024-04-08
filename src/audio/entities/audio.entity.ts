import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audio')
export default class AudioEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  markup: string;
  @Column()
  path: string;
  @OneToOne(() => ProductEntity, (product) => product.audio, {
    nullable: true,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.audio, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
