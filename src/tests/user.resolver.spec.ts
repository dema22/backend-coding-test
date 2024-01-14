import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { UserResolver } from '../resolver/user.resolver';
import { User, UserInput } from '../model/user.models';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from '../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from '@nestjs/common';

class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}

class MockJwtService {
  verifyAsync(token: string, options?: any): any {
    return true;
  }
}

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'postgres',
          models: [User],
        }),
        SequelizeModule.forFeature([User]),
      ],
      providers: [UserResolver,
         UserService,
         { provide: AuthGuard, useClass: MockAuthGuard },
         { provide: JwtService, useClass: MockJwtService },
        ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const userInput: UserInput = {
        username: 'testuser',
        password: 'testpassword',
      };

      const createdUser: Partial<User> = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
      };

      jest.spyOn(userService, 'create').mockResolvedValueOnce(createdUser as User);
      const result = await resolver.createUser(userInput);

      expect(result).toEqual(createdUser);
    });

    it('should handle an error when creating a user', async () => {
      const userInput: UserInput = {
        username: 'testuser',
        password: 'testpassword',
      };
  
      const errorMessage = 'Failed to create user. Please check your input and try again.';
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error(errorMessage));
  
      await expect(resolver.createUser(userInput)).rejects.toThrow(errorMessage);
    });
  });
});