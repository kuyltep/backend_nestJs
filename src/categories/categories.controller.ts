import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get('category/:categoryId')
  findOneCategory(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findOneCategory(+categoryId);
  }

  @Delete('category/:categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.categoriesService.remove(+categoryId);
  }
}
