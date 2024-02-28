import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    access_token: string;
}
