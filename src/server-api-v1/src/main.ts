import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appPort = configService.get<string>('APP_PORT');

    const config = new DocumentBuilder()
        .setTitle('Izi Crawler API')
        .setDescription('server-api-v1')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(parseInt(appPort || '3000', 10));
}
bootstrap();
