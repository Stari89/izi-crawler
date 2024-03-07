import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { MailingService } from './mailing.service';
import { User } from 'src/entities';
import { AuthTokenDto } from 'src/dtos';
import { randomStringGeneratorHelper } from 'src/helpers/random-string-generator.helper';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailingService: MailingService,
    ) {}

    async signUp(email: string, password: string): Promise<string> {
        // Assert if user already exists
        if (await this.usersService.userExists(email)) {
            throw new ConflictException();
        }

        // Generate salt and hash
        const passwordSalt = await genSalt();
        const passwordHash = await hash(password, passwordSalt);

        // Create new user
        const user = await this.usersService.create(email, passwordHash, randomStringGeneratorHelper(5, 'numeric'));

        this.sendConfirmEmail(user);

        // Generate confirmation token
        const payload = { sub: user.uuid, username: user.email };
        const token = await this.jwtService.signAsync(payload, { expiresIn: process.env.TOKEN_EXP_CONFIRM_ACCOUNT });
        return token;
    }

    async signIn(email: string, password: string): Promise<AuthTokenDto> {
        // Get user
        const user = await this.usersService.findOne(email);

        // Check password
        if (!(await compare(password, user.passwordHash))) {
            throw new UnauthorizedException();
        }

        // Assemble payload and generate JWT token
        const payload = { sub: user.uuid, username: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async confirmAccount(token: string) {
        const payload = await this.jwtService.verifyAsync(decodeURIComponent(token), {
            secret: process.env.JWT_SECRET,
        });
        const user = await this.usersService.findOne(payload.username);
        user.emailConfirmed = true;
        await this.usersService.save(user);
    }

    async resendConfirmEmail(email: string): Promise<void> {
        const user = await this.usersService.findOne(email);
        await this.sendConfirmEmail(user);
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.usersService.findOne(email);

        // Generate confirmation token
        const payload = { sub: user.uuid, username: user.email };
        const token = await this.jwtService.signAsync(payload, { expiresIn: process.env.TOKEN_EXP_CONFIRM_ACCOUNT });

        // Send token to email
        await this.mailingService.sendEmail(
            user.email,
            'IZI CRAWLER Password Reset',
            `TODO: link to open the app to the password reset form. For now use this token:<br /><strong>${token}</strong>`,
        );
    }

    async resetPassword(token: string, password: string): Promise<void> {
        const payload = await this.jwtService.verifyAsync(decodeURIComponent(token), {
            secret: process.env.JWT_SECRET,
        });
        const user = await this.usersService.findOne(payload.username);
        await this.setPassword(user, password);
    }

    async updatePassword(email: string, oldPassword: string, password: string): Promise<void> {
        // Get user
        const user = await this.usersService.findOne(email);

        // Check password
        if (!(await compare(oldPassword, user.passwordHash))) {
            throw new UnauthorizedException();
        }

        await this.setPassword(user, password);
    }

    async setPassword(user: User, password: string): Promise<void> {
        // Generate salt and hash
        const passwordSalt = await genSalt();
        const passwordHash = await hash(password, passwordSalt);

        user.passwordHash = passwordHash;

        await this.usersService.save(user);
    }

    private async sendConfirmEmail(user: User): Promise<void> {
        // Send confirmation email
        await this.mailingService.sendEmail(
            user.email,
            'IZI CRAWLER Activation Code',
            `Your code is <strong>${user.confirmationCode}</strong>. It will only be active for ${process.env.TOKEN_EXP_CONFIRM_ACCOUNT}!`,
        );
    }
}
