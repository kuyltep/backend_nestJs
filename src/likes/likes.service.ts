import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly LikeRepository: Repository<LikeEntity>,
  ) {}
  async findUserLikes(userId: number) {
    return await this.LikeRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
        text: true,
      },
    });
  }
  async findPostLikes(postId: number) {
    return await this.LikeRepository.find({
      where: {
        text: {
          id: postId,
        },
      },
      relations: {
        user: true,
        text: true,
      },
    });
  }
  async createUserLike(userId: number, textId: number) {
    const isExist = await this.LikeRepository.findBy({
      user: { id: userId },
      text: { id: textId },
    });
    if (isExist.length) {
      return await this.removeUserLike(userId, textId);
    }
    const like = {
      user: { id: userId },
      text: { id: textId },
    };
    return await this.LikeRepository.save(like);
  }
  async removeUserLike(userId: number, textId: number) {
    return await this.LikeRepository.delete({
      user: { id: userId },
      text: { id: textId },
    });
  }
}
