import { Body, Controller, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthEmailDto, AuthSignInDto, AuthTokenDto, AuthUpdatePasswordDto } from 'src/dtos';
import { AuthConfirmDto, AuthSafePasswordDto } from 'src/dtos/auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @ApiOkResponse({ type: AuthTokenDto, description: 'User logged in.' })
    @ApiBadRequestResponse({ description: 'Invalid data.' })
    @ApiUnauthorizedResponse({ description: 'Wrong email or password.' })
    async signIn(@Body() body: AuthSignInDto): Promise<AuthTokenDto> {
        const token = await this.authService.signIn(body.email, body.password).catch(() => {
            throw new UnauthorizedException();
        });
        return { accessToken: token };
    }

    @Post('sign-up')
    @ApiOkResponse({ description: 'User created. Request confirmation code next.' })
    @ApiBadRequestResponse({ description: 'Invalid data.' })
    @ApiConflictResponse({ description: 'User already exists.' })
    async signUp(@Body() body: AuthEmailDto): Promise<void> {
        const { email } = body;
        await this.authService.signUp(email);
    }

    @Post('confirmation-code')
    @ApiOkResponse({
        type: AuthTokenDto,
        description:
            'Generated confirmation code and sent it to email. Use accessToken in response and the code to confirm account.',
    })
    @ApiBadRequestResponse({ description: 'Invalid data.' })
    @ApiUnauthorizedResponse({ description: 'Wrong email.' })
    async confirmationCode(@Body() body: AuthEmailDto): Promise<AuthTokenDto> {
        const token = await this.authService.sendConfirmCode(body.email).catch(() => {
            throw new UnauthorizedException();
        });
        return { accessToken: token };
    }

    @Post('confirm-account')
    @ApiOkResponse({ description: 'Account confrimed.' })
    @ApiBadRequestResponse({ description: 'Invalid data.' })
    @ApiUnauthorizedResponse({ description: 'Invalid token or code.' })
    @UseGuards(AuthGuard)
    async confirmAccount(@Request() req: { user: { username: string } }, @Body() body: AuthConfirmDto): Promise<void> {
        await this.authService.confirmAccount(req.user.username, body.confirmationCode).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @Post('reset-password')
    @ApiOkResponse({ description: 'Password was reset.' })
    @ApiBadRequestResponse({ description: 'Invalid data.' })
    @ApiUnauthorizedResponse({ description: 'Invalid token.' })
    @UseGuards(AuthGuard)
    async resetPassword(
        @Request() req: { user: { username: string } },
        @Body() body: AuthSafePasswordDto,
    ): Promise<void> {
        const { password } = body;
        await this.authService.resetPassword(req.user.username, password).catch(() => {
            throw new UnauthorizedException();
        });
    }

    @Post('update-password')
    @ApiOkResponse({ description: 'Password was updated.' })
    @ApiBadRequestResponse({ description: 'Invalid data.' })
    @ApiUnauthorizedResponse({ description: 'Invalid token or old password.' })
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
