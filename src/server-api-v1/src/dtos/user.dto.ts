import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { UserProfileResponseDto } from './user-profile.dto';

export class UserDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    uuid: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail(undefined, { message: 'Email must be valid.' })
    email: string;

    @ApiProperty({ type: UserProfileResponseDto })
    profile: UserProfileResponseDto;
}
