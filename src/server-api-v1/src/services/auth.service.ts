import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInResponseDto } from 'src/dtos';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string): Promise<AuthSignInResponseDto> {
        const user = await this.usersService.findOne(email);
        if (user.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.uuid, username: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
