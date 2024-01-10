import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from 'src/service/user.service';
import { User } from 'src/model/user.models';
import { UserResolver } from 'src/resolver/user.resolver';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserResolver, UserService],
})
export class UserModule {}