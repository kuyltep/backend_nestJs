/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNumberString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  name: string = 'Название пиццы';

  @IsString()
  description: string = 'Состав';

  @IsString()
  sizes: string = '20,30,40';

  @IsString()
  prices: string = '400,599,700';

  @IsNumberString()
  categoryId: number;
}
