import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { ProductType } from '../../../common/enums/product-type.enum';

@InputType({ description: 'Create product input object type.' })
export class CreateProductInput {
  @MinLength(3)
  @Field(() => String, { description: 'A new product name' })
  name: string;
  brand: string;
  categories: string[];
  type: ProductType;
}
