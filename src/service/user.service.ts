import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user/user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  // Create a user
  async create(userData): Promise<User> {
    console.log("entro a crear user");
    const user = new User(userData);
    return await user.save();
  }

  // Lest return all user from the DB
  async findAll(): Promise<User[]> {
    console.log("entro a buscar usuarios");
    return this.userModel.findAll();
  }

  getHello(): string {
    return 'Hello World from the new code :) !';
  }
}
