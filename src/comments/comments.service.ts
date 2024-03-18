import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentRepository: Repository<CommentEntity>,
  ) {}
  async create(createCommentDto: CommentDto): Promise<CommentEntity> {
    const { content } = createCommentDto;
    const comment = new CommentEntity();
    comment.content = content;
    return await this.CommentRepository.save(comment);
  }
  async findAll(): Promise<CommentEntity[]> {
    return await this.CommentRepository.find();
  }
  async findOne(id: number): Promise<CommentEntity> {
    return await this.CommentRepository.findOneBy({ id });
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
