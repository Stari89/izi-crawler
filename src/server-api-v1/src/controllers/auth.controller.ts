import { Body, Controller, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthEmailDto, AuthResetPasswordDto, AuthSignInDto, AuthTokenDto, AuthUpdatePasswordDto } from 'src/dtos';
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
    async signIn(@Body() body: AuthSignInDto): Promise<AuthTokenDto> {
        const token = await this.authService.signIn(body.email, body.password).catch(() => {
            throw new UnauthorizedException();
        });
        return { accessToken: token };
    }

    @ApiOkResponse()
    @Post('sign-up')
    async signUp(@Body() body: AuthEmailDto): Promise<void> {
        const { email } = body;
        await this.authService.signUp(email);
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
    @Post('confirmation-code')
    async confirmationCode(@Body() body: AuthEmailDto): Promise<AuthTokenDto> {
        const token = await this.authService.sendConfirmCode(body.email).catch(() => {
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
        @Body() body: AuthUpdatePasswordDto,
    ): Promise<void> {
        const { password, oldPassword } = body;
        await this.authService.updatePassword(req.user.username, oldPassword, password).catch(() => {
            throw new UnauthorizedException();
        });
    }
}
