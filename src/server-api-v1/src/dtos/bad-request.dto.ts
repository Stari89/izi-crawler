import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
    @ApiProperty({
        example: {
            password: [
                'Password must contain at least one uppercase letter.',
                'Password must be longer than or equal to 8 characters.',
            ],
            confirmPassword: ['Confirm password must match password.'],
        },
        description: 'Object containing field-specific error messages.',
        type: 'object',
    })
    errors: Record<string, string[]>;
}
