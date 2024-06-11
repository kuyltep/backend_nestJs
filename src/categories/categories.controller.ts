import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiResponse({ status: 201, type: CreateCategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    if (req.user.role.name === 'admin') {
      return this.categoriesService.createCategory(createCategoryDto);
    }
    throw new BadRequestException('Insufficient access rights');
  }

  @Get()
  findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get('category/:categoryId')
  findOneCategory(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findOneCategory(+categoryId);
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('category')
  remove(@Query('id') categoryId: string, @Request() req) {
    if (req.user.role.name === 'admin') {
      return this.categoriesService.remove(+categoryId);
    }
    throw new BadRequestException('Insufficient access rights');
  }
}
