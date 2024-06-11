/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ default: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: '1' })
  @IsNumberString()
  categoryId: number;

  @ApiProperty({ default: '' })
  @IsNumberString()
  audioId: number;
}
