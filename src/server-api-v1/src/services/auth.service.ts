import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInResponseDto } from 'src/dtos';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(email: string, password: string): Promise<void> {
        // Assert if user already exists
        if (await this.usersService.userExists(email)) {
            throw new ConflictException();
        }

        // Generate salt and hash
        const passwordSalt = await genSalt();
        const passwordHash = await hash(password, passwordSalt);

        // Create new user
        return this.usersService.create(email, passwordHash);
    }

    async signIn(email: string, password: string): Promise<AuthSignInResponseDto> {
        const user = await this.usersService.findOne(email);
        if (!(await compare(password, user.passwordHash))) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.uuid, username: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
