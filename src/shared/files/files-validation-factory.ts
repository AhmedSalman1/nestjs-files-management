import {
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileType } from './types/file.types.js';
import { createFileTypeRegex } from './utils/file.util.js';
import { NonEmptyArray } from './utils/array.util.js';

const createFileValidators = (
  fileTypes: NonEmptyArray<FileType>,
): FileValidator[] => {
  const fileTypeRegex = createFileTypeRegex(fileTypes);

  return [
    // 1) validate file type
    new FileTypeValidator({ fileType: fileTypeRegex }),

    // 2) custom validation
  ];
};

export const createParseFilePipe = (
  fileTypes: NonEmptyArray<FileType>,
): ParseFilePipe =>
  new ParseFilePipe({
    validators: createFileValidators(fileTypes),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error: string) => {
      console.log('error', error);
      throw new UnprocessableEntityException(error);
    },
    fileIsRequired: true,
  });
