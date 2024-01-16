import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../model/user.models";
import { UserService } from "../service/user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService
  ) { }

  @Mutation(() => User)
  async createUser(
    @Args('username') username: string, @Args('password') password: string,
  ): Promise<User> {
    try {
      return await this.userService.create(username, password);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  getSpecialMessage(@Context() context: { req: Request }): string {
    const userPayload = (context.req as any).user;
    return `Hello, ${userPayload.username}! This is a protected resource, you can view this message because you have been granted access to the app.`;
  }
}