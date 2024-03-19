import { RoleEntity } from 'src/roles/entities/roles.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  tokens: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => ProductEntity, (text) => text.user, { nullable: true })
  @JoinColumn({ name: 'products_id' })
  product: ProductEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user, { nullable: true })
  @JoinColumn({ name: 'comments_id' })
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user, { nullable: true })
  @JoinColumn({ name: 'likes_id' })
  likes: LikeEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
