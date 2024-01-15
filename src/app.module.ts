import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './module/user.module';
import { AuthModule } from './module/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Agrego config para cargar .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Agrego AuthModule x el momento
    AuthModule,
    // Module for user related logic.
    UserModule,
    // Sequealize configuration from PostgreSQL
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
    // GraphQLModule configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  // agrego por el momento
  //providers: [UserResolver],
})
export class AppModule { }
