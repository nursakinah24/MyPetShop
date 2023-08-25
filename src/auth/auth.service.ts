import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface.dto';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { RefreshAccessTokenDto } from './dto/refresh-accesstoken.dto';
import { TokenExpiredError } from 'jsonwebtoken'
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        @InjectRepository(RefreshTokenRepository)
        private readonly refreshTokenRepository: RefreshTokenRepository
    ){}

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const { email, password } = loginDto;

        const user = await this.userService.validateUser(email, password);
        if(!user) {
            throw new UnauthorizedException('Wrong email or password!');
        }
        const access_token = await this.createAccessToken(user);
        const refresh_token = await this.createRefreshToken(user);

        return { access_token, refresh_token } as unknown as LoginResponse;
    }

    async refreshAccessToken(refreshTokenDto: RefreshAccessTokenDto): Promise<{access_token: string}> {
        const {refresh_token } = refreshTokenDto;
        const payload = await this.decodeToken(refresh_token);
        const refreshToken = await this.refreshTokenRepository.findOne
        ({ where: { id: payload.jid },
            relations: ['user'],
         } );
        

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is not found')
        }
        if (refreshToken.isRevoked) {
            throw new UnauthorizedException('Refresh token has been revoked')
        }

        const access_token = await this.createAccessToken(refreshToken.user);

        return { access_token };
    }

    async decodeToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (error) {
            if (error instanceof TokenExpiredError){
                throw new UnauthorizedException('Refresh token is expired');
            } else {
                throw new InternalServerErrorException('Failed to decode token');
            }
        }
    }

    async createAccessToken(user: User): Promise<string> {
        const payload = {
            sub: user.id,
            roles: user.isAdmin ? [UserRole.ADMIN] : [UserRole.USER]
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return accessToken;
    }

    async createRefreshToken(user: User): Promise<string> {
     const refreshToken = await this.refreshTokenRepository.createRefreshToken(
        user, +refreshTokenConfig.expiresIn,
        );
     const payload = {
        jid: refreshToken.id,
     };
     const refresh_token = await this.jwtService.signAsync(payload, refreshTokenConfig,); 
     return refresh_token;
    }

    async revokeRefreshToken(id: string): Promise<void> {
        const refreshToken = await this.refreshTokenRepository.findOne({where: {id}});
        if (!refreshToken) {
            throw new NotFoundException('Refresh token is not found')
        }
        refreshToken.isRevoked = true;
        await refreshToken.save();
    }

    /* async generateJwtToken(user: User): Promise<string> {
        const payload: JwtPayload = {
            sub: user.id,
            roles: user.isAdmin ? [UserRole.ADMIN] : [UserRole.USER],
        };
    
        return this.jwtService.sign(payload);
      } */
}