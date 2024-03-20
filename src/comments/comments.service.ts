import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentRepository: Repository<CommentEntity>,
  ) {}
  async create(
    userId: number,
    productId: number,
    content: string,
  ): Promise<CommentEntity> {
    const isCommentExist = await this.CommentRepository.findOne({
      where: {
        product: {
          id: productId,
        },
        user: {
          id: userId,
        },
      },
    });
    if (isCommentExist) {
      throw new BadRequestException(
        'Комментарий к данному продукту уже существует',
      );
    }
    const comment = {
      user: {
        id: userId,
      },
      content: content,
      product: {
        id: productId,
      },
    };
    return await this.CommentRepository.save(comment);
  }
  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    const comment = await this.CommentRepository.findOneBy({ id });
    const { content } = updateCommentDto;
    comment.content = content;
    return await this.CommentRepository.save(comment);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.CommentRepository.delete(id);
  }
}
