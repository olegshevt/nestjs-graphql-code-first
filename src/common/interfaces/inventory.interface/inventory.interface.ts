import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Inventory {
  @Field()
  name: string;
}
