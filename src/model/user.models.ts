import { Field, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
@ObjectType()
export class User extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column
  password?: string;
}