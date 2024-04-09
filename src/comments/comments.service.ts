import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { Errors } from 'src/constants/errors';

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
    try {
      return await this.CommentRepository.save(comment);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
  async update(
    updateCommentDto: UpdateCommentDto,
    userId: number,
  ): Promise<CommentEntity> {
    const productId = +updateCommentDto.product;
    const comment = await this.CommentRepository.findOneBy({
      user: {
        id: userId,
      },
      product: {
        id: productId,
      },
    });
    if (!comment) {
      throw new BadRequestException('Указанный комментарий не был найден');
    }
    const { content } = updateCommentDto;
    comment.content = content;
    try {
      return await this.CommentRepository.save(comment);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
  async remove(
    commentId: number,
    deleteCommentDto: DeleteCommentDto,
    userId: number,
  ): Promise<DeleteResult> {
    const productId = +deleteCommentDto.product;
    try {
      return await this.CommentRepository.delete({
        id: commentId,
        product: {
          id: productId,
        },
        user: {
          id: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }

  async getUserComments(userId: number) {
    try {
      return await this.CommentRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: {
          product: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
}
