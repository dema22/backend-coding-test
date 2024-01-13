import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "../guards/auth.guard";
import { User, UserInput } from "../model/user.models";
import { UserService } from "../service/user.service";

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
      console.log(user);
      if (!user) {
        console.log("User not found");
        throw new NotFoundException(`User with username ${username} not found`);
      }

      return user;
    }

    @UseGuards(AuthGuard)
    @Query(() => String)
    getSpecialMessage(@Context() context: { req: Request}) : string {
      const userPayload = (context.req as any).user;
      console.log(userPayload);
      return `Hello ${userPayload.username}! This is a protected resource, you can view this message because you have had granted access to the app.`;
    }
}