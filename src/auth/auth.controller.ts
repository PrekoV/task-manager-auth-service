import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import ILogin from 'src/interfaces/loginInterface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() loginUserDto: ILogin) {
        return await this.authService.validateUserByPassword(loginUserDto);
    }
}
