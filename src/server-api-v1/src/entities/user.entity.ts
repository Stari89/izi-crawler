import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    passwordHash: string;

    @Column()
    created: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    emailConfirmed: boolean;

    @Column({ nullable: true })
    confirmationCode: string;

    @Column({ nullable: true })
    confirmationCodeExpiry: Date;

    @OneToOne(() => UserProfile)
    @JoinColumn()
    profile: UserProfile | null | undefined;
}
