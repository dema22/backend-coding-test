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

    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }
}