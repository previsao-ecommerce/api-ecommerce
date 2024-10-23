import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // Adicione suas validações aqui, se necessário
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body('folderName') folderName: string,
  ) {
    if (!folderName) {
      return { error: 'Folder name is required in the request body' };
    }

    const responses = await Promise.all(
      files.map(async (file) => {
        const response = await this.uploadService.upload(
          folderName,
          file.originalname,
          file.buffer,
        );
        return response;
      }),
    );

    return responses;
  }
}
