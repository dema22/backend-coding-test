import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { UserResolver } from '../resolver/user.resolver';
import { User } from '../model/user.models';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from '../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ConflictException, ExecutionContext } from '@nestjs/common';

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
      const createdUser: Partial<User> = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
      };

      jest.spyOn(userService, 'create').mockResolvedValueOnce(createdUser as User);
      const result = await resolver.createUser('testuser', 'testpassword');

      expect(result).toEqual(createdUser);
    });

    it('should handle an error when creating a user', async () => {
      const errorMessage = 'Username is already taken';
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new ConflictException(errorMessage));

      await expect(resolver.createUser('testuser', 'testpassword')).rejects.toThrow(errorMessage);
    });
  });

  describe("get special message", () => {
    it('should return a special message', async () => {
      const context = { req: { headers: { authorization: 'Bearer validToken' }, user: { username: 'testUser' } } as any };
      const result = await resolver.getSpecialMessage(context);
      expect(result).toEqual(`Hello, ${context.req.user.username}! This is a protected resource, you can view this message because you have been granted access to the app.`);
    });
  });
});