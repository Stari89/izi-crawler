import { Body, Controller, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {
    AuthEmailDto,
    AuthResetPasswordDto,
    AuthSignInDto,
    AuthSignUpDto,
    AuthTokenDto,
    AuthUpdatePasswordDto,
} from 'src/dtos';
import { AuthConfirmDto } from 'src/dtos/auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({ type: AuthTokenDto })
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @Post('sign-in')
    async signIn(@Body() signIn: AuthSignInDto): Promise<AuthTokenDto> {
        const token = await this.authService.signIn(signIn.email, signIn.password).catch(() => {
            throw new UnauthorizedException();
        });
        return { accessToken: token };
    }

    @ApiOkResponse({ type: AuthTokenDto })
    @Post('sign-up')
    async signUp(@Body() signUp: AuthSignUpDto): Promise<AuthTokenDto> {
        const { email, password } = signUp;
        const token = await this.authService.signUp(email, password);
        return { accessToken: token };
    }

    @ApiOkResponse()
    @Post('confirm-account')
    @UseGuards(AuthGuard)
    async confirmAccount(@Request() req: { user: { username: string } }, @Body() body: AuthConfirmDto): Promise<void> {
        await this.authService.confirmAccount(req.user.username, body.confirmationCode).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @ApiOkResponse({ type: AuthTokenDto })
    @Post('resend-confirm-code')
    async resendConfirmCode(@Body() confirmEmail: AuthEmailDto): Promise<AuthTokenDto> {
        const token = await this.authService.resendConfirmCode(confirmEmail.email).catch(() => {
            throw new UnauthorizedException();
        });
        return { accessToken: token };
    }

    @ApiOkResponse()
    @Post('reset-password')
    @UseGuards(AuthGuard)
    async resetPassword(
        @Request() req: { user: { username: string } },
        @Body() resetPassword: AuthResetPasswordDto,
    ): Promise<void> {
        const { confirmationCode, password } = resetPassword;
        await this.authService.resetPassword(req.user.username, confirmationCode, password).catch(() => {
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
