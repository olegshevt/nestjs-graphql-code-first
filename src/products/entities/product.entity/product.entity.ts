/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category.entity/category.entity';
import { Inventory } from 'src/common/interfaces/inventory.interface/inventory.interface';
import { ProductType } from 'src/common/enums/product-type.enum';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';

@Entity()
@ObjectType({ description: 'Product model', implements: () => Inventory })
export class Product implements Inventory {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ middleware: [loggerMiddleware] })
  name: string;

  @Column()
  @Field(() => String, { description: 'Brand of the product' })
  brand: string;

  @JoinTable()
  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @Field(() => [String], { description: 'Categories of the product' })
  categories?: Category[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type?: ProductType;
}
