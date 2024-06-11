import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserCoinsDto {
  @IsNotEmpty()
  @IsNumber()
  tokens: number;
}
