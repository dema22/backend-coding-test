import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table, Unique } from 'sequelize-typescript';

@InputType('UserInput')
export class UserInput {
  @Field()
  username: string;

  @Field()
  password?: string;
}

@Table
@ObjectType()
export class User extends Model {
  @Field()
  @Column({ unique: true})
  username: string;

  @Column
  password?: string;
}