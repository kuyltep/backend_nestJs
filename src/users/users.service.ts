import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as argon2 from 'argon2';

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
    return await this.repository.save(user);
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
}
