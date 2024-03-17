import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
    UseGuards,
    Request,
    InternalServerErrorException,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
    AuthEmailDto,
    AuthSignInDto,
    AuthTokenDto,
    AuthUpdatePasswordDto,
    AuthConfirmDto,
    AuthSafePasswordDto,
    BadRequestDto,
} from 'src/dtos';
import { AuthGuard, ResetPasswordGuard } from 'src/guards';
import { AuthService } from 'src/services';
import { EntityNotFoundError } from 'typeorm';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @ApiOkResponse({ type: AuthTokenDto, description: 'User logged in.' })
    @ApiBadRequestResponse({ type: BadRequestDto, description: 'Invalid form data.' })
    @ApiUnauthorizedResponse({ description: 'Incorrect email or password.' })
    @ApiInternalServerErrorResponse({ description: 'Something went wrong.' })
    async signIn(@Body() body: AuthSignInDto): Promise<AuthTokenDto> {
        const token = await this.authService.signIn(body.email, body.password).catch((err) => {
            switch (err.constructor) {
                case EntityNotFoundError:
                    throw new UnauthorizedException('Incorrect email or password.');
                case UnauthorizedException:
                    throw new UnauthorizedException('Incorrect email or password.');
                default:
                    throw new InternalServerErrorException('Something went wrong.');
            }
        });
        return { accessToken: token };
    }

    @Post('sign-up')
    @ApiOkResponse({ description: 'User created. Request confirmation code next.' })
    @ApiBadRequestResponse({ type: BadRequestDto, description: 'Invalid form data.' })
    @ApiConflictResponse({ description: 'User already exists.' })
    @ApiInternalServerErrorResponse({ description: 'Something went wrong.' })
    async signUp(@Body() body: AuthEmailDto): Promise<void> {
        const { email } = body;
        await this.authService.signUp(email).catch((err) => {
            switch (err.constructor) {
                case ConflictException:
                    throw new ConflictException('User already exists.');
                default:
                    throw new InternalServerErrorException('Something went wrong.');
            }
        });
    }

    @Post('confirmation-code')
    @ApiOkResponse({
        description:
            'Generated confirmation code and sent it to email. Use accessToken in response and the code to confirm account.',
    })
    @ApiBadRequestResponse({ type: BadRequestDto, description: 'Invalid form data.' })
    @ApiNotFoundResponse({ description: 'No user with email.' })
    @ApiInternalServerErrorResponse({ description: 'Something went wrong.' })
    async confirmationCode(@Body() body: AuthEmailDto): Promise<void> {
        const { email } = body;
        await this.authService.sendConfirmCode(email).catch((err) => {
            switch (err.constructor) {
                case EntityNotFoundError:
                    throw new NotFoundException(`No user with email ${email}`);
                default:
                    throw new InternalServerErrorException('Something went wrong.');
            }
        });
    }

    @Post('confirm-account')
    @ApiOkResponse({ type: AuthTokenDto, description: 'Account confrimed.' })
    @ApiBadRequestResponse({ type: BadRequestDto, description: 'Invalid form data.' })
    @ApiUnauthorizedResponse({ description: 'Invalid token or code.' })
    @ApiInternalServerErrorResponse({ description: 'Something went wrong.' })
    async confirmAccount(@Body() body: AuthConfirmDto): Promise<AuthTokenDto> {
        const { email, confirmationCode } = body;
        const token = await this.authService.confirmAccount(email, confirmationCode).catch((err) => {
            switch (err.constructor) {
                case EntityNotFoundError:
                    throw new UnauthorizedException('Incorrect email or confirmation code.');
                default:
                    throw new InternalServerErrorException('Something went wrong.');
            }
        });
        return { accessToken: token };
    }

    @Post('reset-password')
    @ApiOkResponse({ description: 'Password was reset.' })
    @ApiBadRequestResponse({ type: BadRequestDto, description: 'Invalid form data.' })
    @ApiUnauthorizedResponse({ description: 'Invalid token.' })
    @ApiInternalServerErrorResponse({ description: 'Something went wrong.' })
    @ApiBearerAuth()
    @UseGuards(ResetPasswordGuard)
    async resetPassword(
        @Request() req: { user: { username: string } },
        @Body() body: AuthSafePasswordDto,
    ): Promise<void> {
        const { password } = body;
        await this.authService.resetPassword(req.user.username, password).catch((err) => {
            switch (err.constructor) {
                case EntityNotFoundError:
                    throw new UnauthorizedException('Incorrect email or confirmation code.');
                default:
                    throw new InternalServerErrorException('Something went wrong.');
            }
        });
    }

    @Post('update-password')
    @ApiOkResponse({ description: 'Password was updated.' })
    @ApiBadRequestResponse({ type: BadRequestDto, description: 'Invalid form data.' })
    @ApiUnauthorizedResponse({ description: 'Invalid token or old password.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async updatePassword(
        @Request() req: { user: { username: string } },
        @Body() body: AuthUpdatePasswordDto,
    ): Promise<void> {
        const { password, oldPassword } = body;
        await this.authService.updatePassword(req.user.username, oldPassword, password).catch((err) => {
            switch (err.constructor) {
                case EntityNotFoundError:
                    throw new UnauthorizedException('Incorrect email or password.');
                case UnauthorizedException:
                    throw new UnauthorizedException('Incorrect email or password.');
                default:
                    throw new InternalServerErrorException('Something went wrong.');
            }
        });
    }
}
