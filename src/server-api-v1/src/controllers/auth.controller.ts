import { Body, Controller, Get, Param, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {
    AuthConfirmResponseDto,
    AuthEmailDto,
    AuthResetPasswordDto,
    AuthSignInDto,
    AuthSignUpDto,
    AuthSignUpResponseDto,
    AuthTokenDto,
    AuthUpdatePasswordDto,
} from 'src/dtos';
import { AuthGuard } from 'src/guards/auth.guard';
import { obfuscateEmailHelper } from 'src/helpers/obfuscate-email.helper';
import { AuthService } from 'src/services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({ type: AuthTokenDto })
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @Post('sign-in')
    signIn(@Body() signIn: AuthSignInDto): Promise<AuthTokenDto> {
        return this.authService.signIn(signIn.email, signIn.password).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @ApiOkResponse({ type: AuthSignUpResponseDto })
    @Post('sign-up')
    async signUp(@Body() signUp: AuthSignUpDto): Promise<AuthSignUpResponseDto> {
        const { email, password } = signUp;
        await this.authService.signUp(email, password);
        return { obfuscatedEmail: obfuscateEmailHelper(signUp.email) };
    }

    @ApiOkResponse({ type: AuthConfirmResponseDto })
    @Get('confirm-account/:token')
    async confirmAccount(@Param('token') token: string): Promise<AuthConfirmResponseDto> {
        // We need to return text, because this will be done in browser
        try {
            await this.authService.confirmAccount(token);
        } catch {
            return { message: 'Something went wrong.' };
        }
        return { message: 'Your account has been confirmed. You may return to the IZI CRAWLER app and login.' };
    }

    @ApiOkResponse()
    @Post('resend-confirm-email')
    async resendConfirmEmail(@Body() confirmEmail: AuthEmailDto): Promise<void> {
        await this.authService.resendConfirmEmail(confirmEmail.email).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @ApiOkResponse()
    @Post('forgot-password')
    async forgotPassword(@Body() forgotPassword: AuthEmailDto): Promise<void> {
        await this.authService.forgotPassword(forgotPassword.email).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @ApiOkResponse()
    @Post('reset-password')
    async resetPassword(@Body() resetPassword: AuthResetPasswordDto): Promise<void> {
        const { accessToken, password } = resetPassword;
        await this.authService.resetPassword(accessToken, password).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @ApiOkResponse()
    @Post('update-password')
    @UseGuards(AuthGuard)
    async updatePassword(
        @Request() req: { user: { username: string } },
        @Body() updatePassword: AuthUpdatePasswordDto,
    ): Promise<void> {
        const { password, oldPassword } = updatePassword;
        await this.authService.updatePassword(req.user.username, oldPassword, password).catch(() => {
            throw new UnauthorizedException();
        });
    }
}
