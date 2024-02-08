import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity/product.entity';
import { Category } from './entities/category.entity/category.entity';
import { CategoriesByProductLoader } from './data-loader/categories-by-product.loader/categories-by-product.loader';

@Resolver(() => Product)
export class ProductCategoriesResolver {
  constructor(
    private readonly categoriesByProductLoader: CategoriesByProductLoader,
  ) {}

  @ResolveField('categories', () => [Category])
  async getCategoriesOfProduct(@Parent() product: Product) {
    return this.categoriesByProductLoader.load(product.id);
  }
}
