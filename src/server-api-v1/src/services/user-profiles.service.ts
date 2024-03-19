import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/entities';
import { initialsHelper } from 'src/helpers/initials.helper';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfilesRepository: Repository<UserProfile>,
    ) {}

    create(fullName: string, bio: string): Promise<UserProfile> {
        const userProfileEntity = new UserProfile();
        userProfileEntity.fullName = fullName;
        userProfileEntity.bio = bio;
        userProfileEntity.initials = initialsHelper(fullName);
        return this.userProfilesRepository.save(userProfileEntity);
    }

    save(userProfile: UserProfile): Promise<UserProfile> {
        return this.userProfilesRepository.save(userProfile);
    }
}
