import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/model/user.models";
import { UserService } from "src/service/user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }

    @Mutation(returns => User)
    async createUser(
        @Args('input') userInput: User,
    ): Promise<User> {
        return await this.userService.create(userInput)
    }

    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }
}