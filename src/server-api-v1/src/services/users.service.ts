import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<UserDto[]> {
        return this.usersRepository.find();
    }

    findOne(email: string): Promise<UserDto> {
        return this.usersRepository.findOneOrFail({
            where: { email },
        });
    }
}
