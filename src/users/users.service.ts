import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as argon2 from 'argon2';
import { Errors } from 'src/constants/errors';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByUsername(dto.username);
    const existingUserByEmail = await this.repository.findOneBy({
      email: dto.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    } else if (existingUserByEmail) {
      throw new BadRequestException(`Email ${dto.email} уже существует`);
    }
    const user = {
      username: dto.username,
      password: await argon2.hash(dto.password),
      email: dto.email,
      role: dto.role,
    };
    try {
      return await this.repository.save(user);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }

  async findByUsername(username: string) {
    return this.repository.findOne({
      where: { username: username },
      relations: { comments: true, likes: true, role: true },
    });
  }
  async findById(id: number) {
    return this.repository.findOne({
      where: { id: id },
      relations: { comments: true, likes: true, role: true },
    });
  }
  async deleteUser(deleteUser: DeleteUserDto, user) {
    try {
      const userData = await this.repository.findOne({
        where: { id: user.id },
      });
      const isPasswordCorrect = await argon2.verify(
        userData.password,
        deleteUser.password,
      );
      if (isPasswordCorrect) {
        return await this.repository.delete({ id: user.id });
      } else {
        throw new BadRequestException(Errors.PASSWORD_ERROR);
      }
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
  async udpateUserTokens(userId: number, tokens: number) {
    try {
      const user = await this.repository.findOne({ where: { id: userId } });
      user.tokens += tokens;
      return await this.repository.update(userId, user);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
}
