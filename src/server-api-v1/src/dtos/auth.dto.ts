import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { FieldMatch } from 'src/decorators/field-match.decorator';

class AuthSafePasswordDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/[A-Z]/, { message: ({ property }) => `${property} must contain at least one uppercase letter` })
    @Matches(/[a-z]/, { message: ({ property }) => `${property} must contain at least one lowercase letter` })
    @Matches(/\d/, { message: ({ property }) => `${property} must contain at least one number` })
    @Matches(/.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/, {
        message: ({ property }) => `${property} must contain at least one special character`,
    })
    password: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    @FieldMatch('password', {
        message: ({ property, constraints }) => `${property} must match ${constraints[0]}`,
    })
    confirmPassword: string;
}

export class AuthConfirmDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    confirmationCode: string;
}

export class AuthEmailDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class AuthTokenDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    accessToken: string;
}

export class AuthResetPasswordDto extends IntersectionType(AuthSafePasswordDto, AuthConfirmDto) {}

export class AuthSignInDto extends AuthEmailDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    password: string;
}

export class AuthSignUpDto extends IntersectionType(AuthEmailDto, AuthSafePasswordDto) {}

export class AuthUpdatePasswordDto extends AuthSafePasswordDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    oldPassword: string;
}
