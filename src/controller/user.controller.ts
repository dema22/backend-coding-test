import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from 'src/models/user/user.model';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userData): Promise<User> {
    return this.userService.create(userData);
  }

  /*@Get()
  getAllUsers(): Promise<User[]> {
    console.log("entro a user controller");
    return this.userService.findAll();
  }*/

  @Get()
  hello(): string {
    return "Sigo andando";
  }
}
