import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

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

  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;
  
  @Field()
  @Column({ unique: true})
  username: string;

  @Column
  password?: string;

  // By default, Sequelize automatically adds the attributes createdAt and updatedAt to every model,
  // using the data type DataTypes.DATE
}