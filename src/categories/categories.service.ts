import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const { name } = createCategoryDto;
    const category = new CategoryEntity();
    category.name = name;

    return await this.categoryRepository.save(category);
  }

  findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<CategoryEntity> {
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
