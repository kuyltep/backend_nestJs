import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommentEntity } from 'src/comments/entities/comment.entity';

export class CreateCommentLikeDto {
  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  comment: CommentEntity;
}
