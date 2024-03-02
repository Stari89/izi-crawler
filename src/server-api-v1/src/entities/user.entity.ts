import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ nullable: false })
    fullName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    passwordHash: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    emailConfirmed: boolean;
}
