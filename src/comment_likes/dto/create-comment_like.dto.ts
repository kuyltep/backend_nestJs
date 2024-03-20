import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreateCommentLikeDto {
  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  comment: CommentEntity;
}
