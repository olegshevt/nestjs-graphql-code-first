import { ObjectType } from '@nestjs/graphql';
import { Inventory } from '../../../common/interfaces/inventory.interface/inventory.interface';

@ObjectType({ implements: () => Inventory })
export class Service implements Inventory {
  name: string;
}
