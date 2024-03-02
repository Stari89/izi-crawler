import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto, SignInDto, SignUpDto, SignUpResponseDto } from 'src/dtos';
import { obfuscateEmailHelper } from 'src/helpers/obfuscate-email.helper';
import { AuthService } from 'src/services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({ type: AuthDto })
    @Post('sign-in')
    signIn(@Body() signIn: SignInDto): Promise<AuthDto> {
        return this.authService.signIn(signIn.email, signIn.password);
    }

    @ApiOkResponse({ type: SignUpResponseDto })
    @Post('sign-up')
    signUp(@Body() signUp: SignUpDto): Promise<SignUpResponseDto> {
        // TODO: check uniqueness
        // TODO: save to DB
        // TODO: send confirmation email
        return Promise.resolve({ obfuscatedEmail: obfuscateEmailHelper(signUp.email) });
    }

    // TODO: all of these

    @Post('confirm-account')
    confirmAccount() {}

    @Post('resend-confirm-email')
    resendConfirmEmail() {}

    @Post('forgot-password')
    forgotPassword() {}

    @Post('reset-password')
    resetPassword() {}

    @Post('update-password')
    updatePassword() {}
}
