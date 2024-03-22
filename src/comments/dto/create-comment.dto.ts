import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommentLikeEntity } from 'src/comment_likes/entities/comment_like.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  @ApiProperty({ default: 'comment text' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  product: ProductEntity;
}
