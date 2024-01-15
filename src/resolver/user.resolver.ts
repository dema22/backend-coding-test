import { ConflictException, NotFoundException, UseGuards } from "@nestjs/common";
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
      if (error instanceof ConflictException) {
        throw error;
      }
      // Rethrow any other unexpected errors
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  getSpecialMessage(@Context() context: { req: Request }): string {
    const userPayload = (context.req as any).user;
    console.log(userPayload);
    return `Hello, ${userPayload.username}! This is a protected resource, you can view this message because you have been granted access to the app.`;
  }
}