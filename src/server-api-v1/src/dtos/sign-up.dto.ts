import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { FieldMatch } from 'src/decorators/field-match.decorator';

export class SignUpDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

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

export class SignUpResponseDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    obfuscatedEmail: string;
}
