/*import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./user.models";
import { UserService } from "src/service/user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }

    @Mutation(returns => User)
    async createCustomer(
        @Args('input') userInput: User,
    ): Promise<User> {
        return await this.userService.create(userInput)
    }
}*/

import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class UserResolver {

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}