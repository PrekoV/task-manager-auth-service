import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import ILogin from 'src/interfaces/loginInterface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUserByPassword(dataForLogin: ILogin) {

        // This will be used for the initial login
        const userToAttempt = await this.userService.getUserByEmail(dataForLogin.email);

        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(dataForLogin.password, (err, isMatch) => {

                console.log(dataForLogin);
                if (err) {
                    console.log(err);
                    throw new UnauthorizedException();
                }

                if (isMatch) {
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));

                }
            });

        });

    }

    async validateUserByJwt(payload) {

        // This will be used when the user has already logged in and has a JWT
        const user = await this.userService.getUserByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user) {

        const data = {
            email: user.email,
        };

        const currentUser = this.userService.getUserByEmail(user.email);

        const jwt = this.jwtService.sign(data);

        return {
            token: jwt,
            ...currentUser,
        };

    }
}
