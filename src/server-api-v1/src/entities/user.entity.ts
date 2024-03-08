import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
