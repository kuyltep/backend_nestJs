import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty } from 'class-validator';
import { ProductEntity } from 'src/product/entities/product.entity';

export class UpdateCategoryDto {
  @ApiProperty({ default: '[]' })
  @IsNotEmpty()
  products: ProductEntity[];
}
