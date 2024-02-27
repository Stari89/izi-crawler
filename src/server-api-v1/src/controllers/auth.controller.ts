import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, UserDto } from 'src/dtos';
import { AuthService } from 'src/services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({ type: UserDto })
    @Post('sign-in')
    signIn(@Body() signIn: SignInDto): Promise<UserDto> {
        return this.authService.signIn(signIn.email, signIn.password);
    }
}
