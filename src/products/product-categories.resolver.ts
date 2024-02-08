import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity/category.entity';
import { Repository } from 'typeorm';

@Resolver(() => Product)
export class ProductCategoriesResolver {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  @ResolveField('categories', () => [Category])
  async getCategoriesOfProduct(@Parent() product: Product) {
    return this.categoriesRepository
      .createQueryBuilder('category')
      .innerJoin('category.products', 'products', 'products.id = :productId', {
        productId: product.id,
      })
      .getMany();
  }
}
