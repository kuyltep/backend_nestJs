import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';

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
  async update(updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
    const userId = +updateCommentDto.user;
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
    return await this.CommentRepository.save(comment);
  }
  async remove(
    commentId: number,
    deleteCommentDto: DeleteCommentDto,
  ): Promise<DeleteResult> {
    const userId = +deleteCommentDto.user;
    const productId = +deleteCommentDto.product;
    // return await this.CommentRepository.delete({
    //   user: {
    //     id: userId,
    //   },
    //   product: {
    //     id: productId,
    //   },
    // });
    return await this.CommentRepository.delete({
      id: commentId,
    });
  }

  async getUserComments(userId: number) {
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
  }
  async getProductComments(productId: number) {
    return await this.CommentRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
      relations: {
        comment_likes: true,
      },
    });
  }
}
