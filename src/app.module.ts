import { Module } from '@nestjs/common';
import { FilesUploadModule } from './files-upload/files-upload.module.js';

@Module({
  imports: [FilesUploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
