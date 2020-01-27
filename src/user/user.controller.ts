import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import IUser from 'src/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private service: UserService) { }
    // @Get('/test')
    // @UseGuards(AuthGuard())
    @Get('/:userId')
    @UseGuards(AuthGuard())
    async getUserById(@Param('userId') userId: string): Promise<IUser> {
        console.log('get usr');
        console.log(this.service.getUser(userId));
        return this.service.getUser(userId);
    }

    @Get()
    @UseGuards(AuthGuard())
    async getUsers(): Promise<IUser[]> {
        return this.service.getUsers();
    }

    @Post()
    async createUser(@Body() user: IUser): Promise<IUser> {
        return this.service.createUser(user);
    }

    // @Get('/test')
    // @UseGuards(AuthGuard())
    // testAuthRoute() {

    //     return {
    //         message: 'You did it!',
    //     };
    // }
}
