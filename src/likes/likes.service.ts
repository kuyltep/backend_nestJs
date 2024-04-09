import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { Repository } from 'typeorm';
import { Errors } from 'src/constants/errors';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly LikeRepository: Repository<LikeEntity>,
  ) {}
  async findUserLikes(userId: number) {
    try {
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
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
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
    try {
      return await this.LikeRepository.save(like);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
  async removeUserLike(userId: number, textId: number) {
    try {
      return await this.LikeRepository.delete({
        user: { id: userId },
        text: { id: textId },
      });
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
}
