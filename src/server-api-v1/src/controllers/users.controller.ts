import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dtos';
import { UsersService } from 'src/services';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOkResponse({ type: [UserDto] })
    @Get()
    getUsers(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }
}
