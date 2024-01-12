import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "src/service/auth.service";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('username') username: string, @Args('password') password: string): Promise<string> {
    try {
      const result = await this.authService.logIn(username, password);
      console.log(result);
      return result.access_token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}