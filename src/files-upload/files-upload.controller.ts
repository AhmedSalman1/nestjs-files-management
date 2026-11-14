import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createParseFilePipe } from '../shared/files/files-validation-factory.js';
import { parseFileSize } from '../shared/files/utils/file.util.js';

type File = Express.Multer.File;
const MAX_SIZE = '2MB' as const;

@Controller('files-upload')
export class FilesUploadController {
  // constructor() {}

  @Post('/single')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: parseFileSize(MAX_SIZE) },
    }),
  )
  uploadFile(
    @UploadedFile(createParseFilePipe(['png', 'jpg', 'jpeg']))
    file: File,
  ) {
    // await this.awsS3.uploadSingleFile(file)
    return file;
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      limits: { fileSize: parseFileSize(MAX_SIZE) },
    }),
  )
  uploadFiles(
    @UploadedFiles(createParseFilePipe(['png', 'jpg', 'jpeg']))
    files: File[],
  ) {
    // await this.awsS3.uploadMultipleFiles(files)
    return files.map((file) => file.originalname);
  }
}
