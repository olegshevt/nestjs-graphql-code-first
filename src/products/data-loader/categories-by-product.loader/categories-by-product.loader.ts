import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { Category } from '../../entities/category.entity/category.entity';
import { Product } from '../../entities/product.entity/product.entity';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesByProductLoader extends DataLoader<number, Category[]> {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    productIds: readonly number[],
  ): Promise<Category[][]> {
    const productsWithCategories = await this.productsRepository.find({
      select: ['id'],
      relations: {
        categories: true,
      },
      where: {
        id: In(productIds as number[]),
      },
    });
    return productsWithCategories.map((product) => product.categories);
  }
}
