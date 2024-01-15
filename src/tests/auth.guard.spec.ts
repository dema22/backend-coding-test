import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { ExecutionContext } from '@nestjs/common';

class MockJwtService {
    verifyAsync(token: string, options?: any): any {
        return {
            sub: 1,
            username: 'testuser',
            iat: expect.any(Number),
            exp: expect.any(Number),
        };
    }
}

describe('AuthGuard', () => {
    let guard: AuthGuard;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthGuard,
                { provide: JwtService, useClass: MockJwtService },
            ],
        }).compile();

        guard = module.get<AuthGuard>(AuthGuard);
    });

    it('should activate when a valid token is provided', async () => {
        const mockRequest: Request = {
            headers: {
                authorization: 'Bearer valid_token_here',
            },
        } as any;

        const gqlMockFactory = (mockRequest: Request): ExecutionContext =>
        ({
            getType: () => 'graphql',
            getHandler: () => 'query',
            getClass: () => 'Test Class',
            getArgs: () => [{}, {}, { req: mockRequest }, {}],
            getArgByIndex: () => ({} as any),
            switchToHttp: () => ({} as any),
            switchToRpc: () => ({} as any),
            switchToWs: () => ({} as any),
        } as any);
        const gqlContext = gqlMockFactory(mockRequest);
        const result = await guard.canActivate(gqlContext);

        // Assert that the canActivate method returns true
        expect(result).toBe(true);

        // Assert that the user property is set on the request with the correct values
        expect(mockRequest['user']).toEqual({
            sub: 1,
            username: 'testuser',
            iat: expect.any(Number),
            exp: expect.any(Number),
        });
    });
});