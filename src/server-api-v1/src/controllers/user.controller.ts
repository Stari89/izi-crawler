import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Request,
    UnprocessableEntityException,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserDto } from 'src/dtos';
import { AuthGuard } from 'src/guards';
import { UsersService } from 'src/services';
import { EntityNotFoundError } from 'typeorm';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOkResponse({ type: UserDto, description: 'Gets the signed in user.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiUnauthorizedResponse({ description: 'Invalid or expired access token.' })
    @ApiInternalServerErrorResponse({ description: 'Something went wrong.' })
    @ApiUnprocessableEntityResponse({ description: 'User profile needs to be created.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getUser(@Request() req: { user: { username: string } }): Promise<UserDto> {
        const userEntity = await this.usersService.findOne(req.user.username).catch((err) => {
            switch (err.constructor) {
                case EntityNotFoundError:
                    throw new NotFoundException('User not found.');
                default:
                    throw new InternalServerErrorException('Something went wrong.');
            }
        });
        if (!userEntity.profile) {
            throw new UnprocessableEntityException('User profile needs to be created.');
        }

        const userDto = new UserDto();
        userDto.email = userEntity.email;
        userDto.profile = userEntity.profile;
        return userDto;
    }
}
