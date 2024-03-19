import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    fullName: string;

    @Column()
    bio: string;

    @Column()
    initials: string;

    // todo: image
}
