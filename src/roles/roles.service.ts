import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/roles.entity';
import { DeleteResult, Repository } from 'typeorm';
import { RoleDto } from './dto/roles.dto';

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
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<RoleEntity> {
    return this.roleRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }
}
