import { CommentEntity } from 'src/comments/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  CommonEvents,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment_like')
export class CommentLikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.comments_like)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.comment_likes)
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
