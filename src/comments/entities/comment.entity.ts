import { CommentLikeEntity } from 'src/comment_likes/entities/comment_like.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @OneToMany(() => CommentLikeEntity, (commentLike) => commentLike.comment, {
    nullable: true,
  })
  @JoinColumn({ name: 'comment_likes' })
  comment_likes: CommentLikeEntity[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
