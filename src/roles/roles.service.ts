import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/roles.entity';
import { DeleteResult, Repository } from 'typeorm';
import { RoleDto } from './dto/roles.dto';
import { Errors } from 'src/constants/errors';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
  async create(roleDto: RoleDto): Promise<RoleEntity> {
    const { name } = roleDto;
    const role = new RoleEntity();
    role.name = name;
    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }

  async findAll(): Promise<RoleEntity[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<RoleEntity> {
    try {
      return await this.roleRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.roleRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
}
