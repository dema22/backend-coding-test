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
      secret: 'secret key',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}