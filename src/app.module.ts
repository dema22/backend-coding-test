import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db',
      port: 3306,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      models: [User],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
