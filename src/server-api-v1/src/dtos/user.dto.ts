import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, isNotEmpty } from 'class-validator';

export class UserDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    uuid: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: 'boolean' })
    @IsNotEmpty()
    isActive: boolean;

    @ApiProperty({ type: 'boolean' })
    @IsNotEmpty()
    emailConfirmed: boolean;
}
