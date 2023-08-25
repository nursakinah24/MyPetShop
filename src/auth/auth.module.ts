import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { JwtStrategy } from './jwtt.strategy';

@Module({
  imports: [JwtModule.register(jwtConfig), TypeOrmExModule.forCustomRepository([RefreshTokenRepository]), 
  UsersModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
