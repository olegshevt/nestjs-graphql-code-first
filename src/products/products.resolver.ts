/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Product } from './entities/product.entity/product.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input/create-product.input';
import { ProductsService } from './products.service';
import { UpdateProductInput } from './dto/update-product.input/update-product.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly pubSub: PubSub,
  ) {}
  @Query(() => [Product])
  async products() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async create(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(id, updateProductInput);
  }

  @Mutation(() => Product, { name: 'removeProduct' })
  async remove(@Args('id') id: number) {
    return this.productsService.remove(id);
  }

  @Subscription(() => Product)
  productAdded() {
    return this.pubSub.asyncIterator('productAdded');
  }
}
