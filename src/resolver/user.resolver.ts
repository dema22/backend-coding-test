import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User, UserInput } from "src/model/user.models";
import { UserService } from "src/service/user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }

    @Mutation(returns => User)
    async createUser(
        @Args('input') userInput: UserInput,
    ): Promise<User> {
        try {
            return await this.userService.create(userInput)
        } catch (error) {
            throw new Error("Failed to create user. Please check your input and try again.");
        }
    }

    @Query(returns => User)
    async getUserByUsername(@Args('username') username: string) {
      console.log("searching user existence.")
      const user = await this.userService.getUserByUsername(username);
        
      if (!user) {
        console.log("User not found");
        throw new NotFoundException(`User with username ${username} not found`);
      }

      return user;
    }

    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }
}