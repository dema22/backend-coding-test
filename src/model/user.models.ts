import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
@ObjectType()
@InputType('UserInput')
export class User extends Model {
  @Field()
  @Column
  username: string;

  @Field()
  @Column
  password?: string;
}