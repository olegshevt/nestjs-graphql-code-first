import { Query, Resolver } from '@nestjs/graphql';
import { InventoriesResultUnion } from 'src/common/unions/inventories-result.union';
import { Product } from 'src/products/entities/product.entity/product.entity';
import { Service } from 'src/services/entities/service.entity/service.entity';

@Resolver()
export class InventoriesResolver {
  @Query(() => [InventoriesResultUnion], { name: 'inventories' })
  async findAll(): Promise<(typeof InventoriesResultUnion)[]> {
    const product = new Product();
    product.id = 1;
    product.name = 'Test Product';
    product.brand = 'Test Brand';

    const service = new Service();
    service.name = 'Tester';
    return [service, product];
  }
}
