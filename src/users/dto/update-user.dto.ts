import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserCoinsDto {
  @IsNotEmpty()
  @IsNumber()
  tokens: number;
}

export class UpdateUserInfoDto {
  @ApiProperty({ default: 'name1' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must be more then 3 symbols' })
  username: string;

  @ApiProperty({ default: 'hello@gmail.com' })
  @IsEmail()
  email: string;
}

export class UpdateUserPasswordDto {
  @ApiProperty({ default: '123' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Password must be more then 3 symbols' })
  currentPassword: string;

  @ApiProperty({ default: '123' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Password must be more then 3 symbols' })
  newPassword: string;
}
