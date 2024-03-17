import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { AuthGuard } from 'src/guards';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor() {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const uploadsPath = process.env.UPLOADS_PATH || './uploads';
                    if (!fs.existsSync(uploadsPath)) {
                        fs.mkdirSync(uploadsPath);
                    }
                    cb(null, uploadsPath);
                },
                filename: (req, file, cb) => {
                    console.log(process.env.UPLOADS_PATH);
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const extension = path.parse(file.originalname).ext;
                    cb(null, `${uniqueSuffix}${extension}`);
                },
            }),
        }),
    )
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
}
