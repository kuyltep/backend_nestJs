import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Response,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';

import { fileStorage } from './storage';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: CreateProductDto })
  @Post()
  @ApiConsumes('multipart/form-data')
  create(@Body() dto: CreateProductDto, @Req() req): Promise<ProductEntity> {
    const user = req.user;
    return this.productService.create(dto, user);
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: UpdateProductDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() request,
  ) {
    const user = request.user;
    return this.productService.update(+id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.delete(+id);
  }
}
