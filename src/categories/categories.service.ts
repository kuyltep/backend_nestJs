import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

    return await this.categoryRepository.save(category);
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOneCategory(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      where: { id: id },
      relations: {
        products: true,
      },
    });
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
      relations: {
        products: true,
      },
    });
    if (!category) {
      throw new BadRequestException('Указанная категория не была найдена');
    }
    const updatedCategoryProducts = category.products.concat(
      ...updateCategoryDto.products,
    );
    category.products = updatedCategoryProducts;
    return this.categoryRepository.save(category);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
