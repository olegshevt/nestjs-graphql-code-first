import { registerEnumType } from '@nestjs/graphql';

export enum ProductType {
  REGULAR = 'Regular',
  PREMIUM = 'Premium',
}

registerEnumType(ProductType, {
  name: 'ProductType',
});
