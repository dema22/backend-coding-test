import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) { }

  async logIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Create a valid JWT to grant access to the user.
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET_KEY }),
      };
    } else {
      throw new UnauthorizedException("You cant log in.");
    }
  }
}