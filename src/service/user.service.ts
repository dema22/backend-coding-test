import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserInput } from '../model/user.models';
import * as bcrypt from "bcrypt";
import { handleDatabaseError } from '../utils/error.handling.utils';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  // Create a user
  async create(userInput: UserInput): Promise<User> {
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(userInput.password, 10);

      // Create a new user with the hashed password
      const user = new User({
        username: userInput.username,
        password: hashedPassword
      });

      // Saved user in db.
      return await user.save();
    } catch (error) {
      const handledError = handleDatabaseError(error);
      if (handledError) {
        throw handledError;
      }

      throw error;
    }
  }

  // Find user by username.
  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }
}
