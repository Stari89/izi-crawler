import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(email: string): Promise<User> {
        return this.usersRepository.findOneOrFail({
            where: { email },
        });
    }

    userExists(email: string): Promise<boolean> {
        return this.usersRepository.findOne({ where: { email } }).then((u) => !!u);
    }

    create(email: string, passwordHash: string): Promise<User> {
        const userEntity = new User();
        userEntity.email = email;
        userEntity.fullName = '';
        userEntity.emailConfirmed = false;
        userEntity.isActive = true;
        userEntity.passwordHash = passwordHash;
        return this.usersRepository.save(userEntity);
    }

    save(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }
}
