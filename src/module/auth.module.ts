import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "src/service/auth.service";
import { AuthResolver } from "src/resolver/auth.resolver";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}