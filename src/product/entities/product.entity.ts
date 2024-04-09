import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
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
import { CommentEntity } from 'src/comments/entities/comment.entity';
import AudioEntity from 'src/audio/entities/audio.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int', { array: true })
  prices: number[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.product, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.text, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'likes_id' })
  likes: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comments_id' })
  comments: CommentEntity[];

  @OneToOne(() => AudioEntity, (audio) => audio.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'audio_id' })
  audio: AudioEntity;
}
