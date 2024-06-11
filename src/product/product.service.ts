import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import AudioEntity from 'src/audio/entities/audio.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
  ) {}

  async create(dto: CreateProductDto, user): Promise<ProductEntity> {
    const audio = await this.audioRepository.findOneBy({ id: dto.audioId });
    const product = new ProductEntity();
    product.name = dto.name;
    product.description = dto.description;
    product.user = user;
    product.audio = audio;
    const newProduct = await this.productRepository.save(product);

    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
      relations: ['products'],
    });

    category.products.push(product);

    await this.categoryRepository.save(category);

    return newProduct;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      relations: {
        likes: true,
        comments: { comment_likes: true },
        category: true,
        user: true,
        audio: true,
      },
    });
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({
      where: { id: id },
      relations: {
        category: true,
        likes: true,
        comments: { comment_likes: true },
        user: true,
        audio: true,
      },
    });
  }

  async update(id: number, dto: UpdateProductDto, user) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        audio: true,
        category: true,
      },
    });
    if (product.audio.id !== dto.audioId) {
      const audio = await this.audioRepository.findOneBy({ id: dto.audioId });
      product.audio = audio;
    }
    if (product.category.id !== dto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: dto.categoryId,
      });
      product.category = category;
    }
    product.name = dto.name;
    product.description = dto.description;
    return await this.productRepository.update(id, product);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
