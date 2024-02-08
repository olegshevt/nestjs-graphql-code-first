import { createUnionType } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity/product.entity';
import { Service } from 'src/services/entities/service.entity/service.entity';

export const InventoriesResultUnion = createUnionType({
  name: 'InventoriesResult',
  types: () => [Product, Service],
});
