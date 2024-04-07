import { IsNotEmpty, IsString } from 'class-validator';

export default class AudioDto {
  @IsNotEmpty()
  @IsString()
  markup: string;
}
