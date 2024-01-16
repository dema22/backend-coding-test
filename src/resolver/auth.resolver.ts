import { Resolver, Mutation, Args, ObjectType, Field } from "@nestjs/graphql";
import { AuthService } from "src/service/auth.service";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => AuthResult)
  async login(@Args('username') username: string, @Args('password') password: string): Promise<{ access_token: string }> {
    try {
      const result = await this.authService.logIn(username, password);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

@ObjectType()
class AuthResult {
  @Field(() => String)
  access_token: string;
}