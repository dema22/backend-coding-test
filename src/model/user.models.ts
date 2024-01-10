import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
@ObjectType()
@InputType('UserInput')
export class User extends Model {
  @Field({ nullable: true })
  @Column
  username?: string;

  @Field({ nullable: true })
  @Column
  password?: string;
}