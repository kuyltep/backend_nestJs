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
import { CreateCommentLikeDto } from 'src/comment_likes/dto/create-comment_like.dto';
import { CommentLikeEntity } from 'src/comment_likes/entities/comment_like.entity';
import AudioEntity from 'src/audio/entities/audio.entity';

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

  @OneToMany(() => ProductEntity, (text) => text.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'products_id' })
  product: ProductEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comments_id' })
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'likes_id' })
  likes: LikeEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @OneToMany(() => CommentLikeEntity, (commentLike) => commentLike.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comments_like' })
  comments_like: CommentLikeEntity[];

  @OneToMany(() => AudioEntity, (audio) => audio.user)
  @JoinColumn({ name: 'audios_id' })
  audio: AudioEntity[];
}
