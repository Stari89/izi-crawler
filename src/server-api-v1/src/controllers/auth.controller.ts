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
        return this.authService.signIn(signIn.email, signIn.password).catch((err) => {
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
    confirmAccount(@Param('token') token: string) {
        return;
    }

    @ApiOkResponse()
    @Get('resend-confirm-email')
    resendConfirmEmail(@Query('email') email: string) {
        return;
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
