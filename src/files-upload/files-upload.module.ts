import { Module } from '@nestjs/common';
import { FilesUploadController } from './files-upload.controller.js';

@Module({
  controllers: [FilesUploadController]
})
export class FilesUploadModule {}
