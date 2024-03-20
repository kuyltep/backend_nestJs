import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentLikeEntity } from './entities/comment_like.entity';
import { Repository } from 'typeorm';
import { CreateCommentLikeDto } from './dto/create-comment_like.dto';
import { DeleteUserCommentLikeDto } from './dto/delete-comment_like.dto';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLikeEntity)
    private CommentLikeRepository: Repository<CommentLikeEntity>,
  ) {}

  async create(userId: number, commentId: number) {
    const isExist = await this.CommentLikeRepository.findBy({
      comment: { id: commentId },
      user: {
        id: userId,
      },
    });
    if (isExist.length) {
      return this.deleteUserCommentLike(userId, commentId);
    }
    const commentLike = {
      user: {
        id: userId,
      },
      comment: {
        id: commentId,
      },
    };
    return await this.CommentLikeRepository.save(commentLike);
  }

  async findUserCommentLikes(userId: number) {
    return await this.CommentLikeRepository.find({
      where: { user: { id: userId } },
    });
  }

  async deleteUserCommentLike(userId: number, commentId: number) {
    return await this.CommentLikeRepository.delete({
      user: { id: userId },
      comment: { id: commentId },
    });
  }
}
