import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { BadRequestDto } from './dtos';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: true });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            transform: true,
            exceptionFactory: (errors) => {
                const result: BadRequestDto = { errors: {} };
                errors.forEach((err) => {
                    if (!err.property || !err.constraints) {
                        return;
                    }
                    result.errors[err.property] = Object.values(err.constraints);
                });
                return new BadRequestException(result);
            },
        }),
    );
    const configService = app.get(ConfigService);
    const appPort = configService.get<string>('APP_PORT');
    const config = new DocumentBuilder()
        .setTitle('Izi Crawler API')
        .setDescription('server-api-v1')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(parseInt(appPort || '3000', 10));
}
bootstrap();
