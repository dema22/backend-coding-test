import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserInput } from 'src/model/user.models';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  // Create a user
  async create(userInput : UserInput): Promise<User> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    // Create a new user with the hashed password
    const user = new User({
      username: userInput.username,
      password: hashedPassword
    });

    // Saved user in db.
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
