import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment_likes.service';
import { CommentLikesController } from './comment_likes.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLikeEntity } from './entities/comment_like.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([CommentLikeEntity])],
  providers: [CommentLikesService],
  controllers: [CommentLikesController],
})
export class CommentLikesModule {}
