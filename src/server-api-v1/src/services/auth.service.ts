import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { MailingService } from './mailing.service';
import { User } from 'src/entities';
import { randomStringGeneratorHelper } from 'src/helpers/random-string-generator.helper';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailingService: MailingService,
    ) {}

    async signUp(email: string): Promise<void> {
        // Assert if user already exists
        if (await this.usersService.userExists(email)) {
            throw new ConflictException();
        }

        // Create new user
        await this.usersService.create(email);
    }

    async signIn(email: string, password: string): Promise<string> {
        // Get user
        const user = await this.usersService.findOne(email);

        // Check password
        if (!(await compare(password, user.passwordHash))) {
            throw new UnauthorizedException();
        }
        return await this.generateUserToken(user, process.env.TOKEN_EXP_GLOBAL);
    }

    async confirmAccount(email: string, confirmationCode: string) {
        const user = await this.usersService.findOne(email);
        this.assertConfirmCode(user, confirmationCode);
        user.emailConfirmed = true;
        await this.usersService.save(user);
        return await this.generateUserToken(user, process.env.TOKEN_EXP_CONFIRM_ACCOUNT);
    }

    async sendConfirmCode(email: string): Promise<void> {
        const user = await this.usersService.findOne(email);

        const confirmationCodeExpiry = new Date();
        confirmationCodeExpiry.setMinutes(confirmationCodeExpiry.getMinutes() + 5);

        user.confirmationCodeExpiry = confirmationCodeExpiry;
        user.confirmationCode = randomStringGeneratorHelper(5, 'numeric');

        this.usersService.save(user);

        await this.sendConfirmEmail(user);
    }

    async resetPassword(email: string, password: string): Promise<void> {
        const user = await this.usersService.findOne(email);
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

    private assertConfirmCode(user: User, confirmationCode: string) {
        if (user.confirmationCodeExpiry < new Date()) {
            throw new UnauthorizedException();
        }
        if (user.confirmationCode !== confirmationCode) {
            throw new UnauthorizedException();
        }
    }

    private async sendConfirmEmail(user: User): Promise<void> {
        // Send confirmation email
        await this.mailingService.sendEmail(
            user.email,
            'IZI CRAWLER Activation Code',
            `Your code is <strong>${user.confirmationCode}</strong>. It will only be active for ${process.env.TOKEN_EXP_CONFIRM_ACCOUNT}!`,
        );
    }

    private async generateUserToken(
        user: User,
        expiresIn: string | undefined = process.env.TOKEN_EXP_CONFIRM_ACCOUNT,
    ): Promise<string> {
        const payload = { sub: user.uuid, username: user.email };
        const token = await this.jwtService.signAsync(payload, { expiresIn });
        return token;
    }
}
