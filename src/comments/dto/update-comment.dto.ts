import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProductEntity } from 'src/product/entities/product.entity';

export class UpdateCommentDto {
  @ApiProperty({ default: 'comment text' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  product: ProductEntity;
}
