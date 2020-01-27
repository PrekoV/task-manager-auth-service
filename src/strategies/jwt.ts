
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
// import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'thisismykickasssecretthatiwilltotallychangelater',
        });

    }

    async validate(payload) {

        const user = await this.authService.validateUserByJwt(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;

    }

}
