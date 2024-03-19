import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserProfileResponseDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    uuid: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Full name is required.' })
    fullName: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Bio is required.' })
    bio: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Initials are required.' })
    initials: string;
}
