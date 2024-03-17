import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { AuthService, MailingService, UsersService } from './services';
import { ConfigModule } from '@nestjs/config';
import { AuthController, FilesController } from './controllers';
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
            entities: [User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXP_GLOBAL },
        }),
    ],
    controllers: [AppController, AuthController, FilesController],
    providers: [AppService, AuthService, MailingService, UsersService],
})
export class AppModule {}
