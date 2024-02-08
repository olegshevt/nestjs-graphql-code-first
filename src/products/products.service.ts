/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input/create-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity/product.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateProductInput } from './dto/update-product.input/update-product.input';
import { Category } from './entities/category.entity/category.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly pubSub: PubSub,
  ) {}

  async findAll() {
    return this.productsRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new UserInputError(`Product with ${id} does not exist`);
    }

    return product;
  }

  async create(createProductInput: CreateProductInput) {
    const categories = await Promise.all(
      createProductInput.categories.map((name) =>
        this.preloadCategoryByName(name),
      ),
    );
    const product = this.productsRepository.create({
      ...createProductInput,
      categories,
    });
    const newProduct = this.productsRepository.save(product);
    this.pubSub.publish('productAdded', { productAdded: newProduct });
    return newProduct;
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const categories = await Promise.all(
      updateProductInput.categories &&
        updateProductInput.categories.map((name) =>
          this.preloadCategoryByName(name),
        ),
    );

    const product = await this.productsRepository.preload({
      id,
      ...updateProductInput,
      categories,
    });

    if (!product) {
      throw new UserInputError(`Product with ${id} does not exist`);
    }

    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new UserInputError(`Product with ${id} does not exist`);
    }

    return this.productsRepository.remove(product);
  }

  private async preloadCategoryByName(name: string): Promise<Category> {
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name },
    });
    if (existingCategory) {
      return existingCategory;
    }
    return this.categoriesRepository.create({ name });
  }
}
