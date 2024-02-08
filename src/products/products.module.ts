import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity/product.entity';
import { Category } from './entities/category.entity/category.entity';
import { ProductCategoriesResolver } from './product-categories.resolver';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { CategoriesByProductLoader } from './data-loader/categories-by-product.loader/categories-by-product.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), PubSubModule],
  providers: [ProductsResolver, ProductsService, ProductCategoriesResolver, CategoriesByProductLoader],
})
export class ProductsModule {}
