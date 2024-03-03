import { Body, Controller, Get, Param, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
    AuthResetPasswordDto,
    AuthSignInDto,
    AuthSignInResponseDto,
    AuthSignUpDto,
    AuthSignUpResponseDto,
    AuthUpdatePasswordDto,
} from 'src/dtos';
import { AuthGuard } from 'src/guards/auth.guard';
import { obfuscateEmailHelper } from 'src/helpers/obfuscate-email.helper';
import { AuthService } from 'src/services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({ type: AuthSignInResponseDto })
    @Post('sign-in')
    signIn(@Body() signIn: AuthSignInDto): Promise<AuthSignInResponseDto> {
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

    // TODO: all of these

    @ApiOkResponse()
    @Get('confirm-account/:token')
    async confirmAccount(@Param('token') token: string): Promise<string> {
        // We need to return text, because this will be done in browser
        try {
            await this.authService.confirmAccount(token);
        } catch {
            return 'Something went wrong.';
        }
        return 'Your account has been confirmed. You may return to the IZI CRAWLER app and login.';
    }

    @ApiOkResponse()
    @Get('resend-confirm-email')
    async resendConfirmEmail(@Query('email') email: string): Promise<void> {
        await this.authService.resendConfirmEmail(email).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @ApiOkResponse()
    @Get('forgot-password')
    forgotPassword(@Query('email') email: string) {
        return;
    }

    @ApiOkResponse()
    @Post('reset-password')
    resetPassword(@Body() resetPassword: AuthResetPasswordDto) {
        return;
    }

    @ApiOkResponse()
    @Post('update-password')
    @UseGuards(AuthGuard)
    updatePassword(@Body() updatePassword: AuthUpdatePasswordDto) {
        return;
    }
}
