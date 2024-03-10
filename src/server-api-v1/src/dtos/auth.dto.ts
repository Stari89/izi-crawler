import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { FieldMatch } from 'src/decorators/field-match.decorator';

export class AuthSafePasswordDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @MaxLength(50, { message: 'Password must not exceed 50 characters.' })
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/\d/, { message: 'Password must contain at least one number.' })
    @Matches(/.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/, {
        message: 'Password must contain at least one special character.',
    })
    password: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Confirm password is required.' })
    @FieldMatch('password', {
        message: 'Passwords must match.',
    })
    confirmPassword: string;
}

export class AuthConfirmDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Confirmation code is required.' })
    confirmationCode: string;
}

export class AuthEmailDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail(undefined, { message: 'Email must be valid.' })
    email: string;
}

export class AuthTokenDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty(/* no message, only for responses*/)
    accessToken: string;
}

export class AuthSignInDto extends AuthEmailDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;
}

export class AuthUpdatePasswordDto extends AuthSafePasswordDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Old password is required.' })
    oldPassword: string;
}
