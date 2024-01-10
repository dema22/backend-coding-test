import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service';
import { User } from 'src/models/user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}