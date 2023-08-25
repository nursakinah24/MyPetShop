import { Controller, Body, Post, UseGuards, Param, Patch } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from './interface/login-response.interface.dto';
import { RefreshAccessTokenDto } from './dto/refresh-accesstoken.dto';
import { JwtGuard } from 'src/guard/jwt.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        return this.authService.login(loginDto);
    }
    
    @Post('refresh-token')
    async refreshToken(
        @Body() refreshTokenDto: RefreshAccessTokenDto): 
        Promise<{access_token: string}> {
        return this.authService.refreshAccessToken(refreshTokenDto);
    }

    @Patch('/:id/revoke')
    @UseGuards(JwtGuard)
    async revokeRefreshToken(@Param('id') id: string): Promise<void> {
        return this.authService.revokeRefreshToken(id);
    }
}
