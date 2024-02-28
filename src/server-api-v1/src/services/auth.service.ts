import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/dtos';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string): Promise<AuthDto> {
        const user = await this.usersService.findOne(email);
        console.log(user);
        if (user.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.uuid, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
