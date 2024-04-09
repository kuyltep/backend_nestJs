import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Errors } from 'src/constants/errors';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const isExist = await this.categoryRepository.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (isExist) {
      throw new BadRequestException('Данная категория уже существует');
    }
    const { name } = createCategoryDto;
    const category = new CategoryEntity();
    category.name = name;
    try {
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }

  async findOneCategory(id: number): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findOne({
        where: { id: id },
        relations: {
          products: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
}
