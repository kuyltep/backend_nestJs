import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_like')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (text) => text.likes)
  @JoinColumn({ name: 'text_id' })
  text: ProductEntity;
  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
