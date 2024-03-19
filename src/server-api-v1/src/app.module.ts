import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from './entities';
import { AuthService, MailingService, UserProfilesService, UsersService } from './services';
import { ConfigModule } from '@nestjs/config';
import { AuthController, FilesController, UserController } from './controllers';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.preview', '.env.development', '.env'] }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306', 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            entities: [User, UserProfile],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, UserProfile]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXP_GLOBAL },
        }),
    ],
    controllers: [AppController, AuthController, FilesController, UserController],
    providers: [AppService, AuthService, MailingService, UserProfilesService, UsersService],
})
export class AppModule {}
