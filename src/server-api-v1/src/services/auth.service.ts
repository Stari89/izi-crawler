import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user.password !== password) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
