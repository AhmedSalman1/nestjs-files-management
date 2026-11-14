import {
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileType } from './types/file.types.js';
import { createFileTypeRegex } from './utils/file.util.js';
import { NonEmptyArray } from './utils/array.util.js';

const createFileValidators = (
  maxSize: number,
  fileTypes: NonEmptyArray<FileType>,
): FileValidator[] => {
  const fileTypeRegex = createFileTypeRegex(fileTypes);

  return [
    // 1) validate file size
    new MaxFileSizeValidator({
      maxSize,
      message: (maxSize) =>
        `File is too big. Max file size is ${maxSize} bytes`,
    }),

    // 2) validate file type (extension)
    new FileTypeValidator({ fileType: fileTypeRegex }),

    // 3) custom validation
  ];
};

export const createParseFilePipe = (
  maxSize: number,
  fileTypes: NonEmptyArray<FileType>,
): ParseFilePipe =>
  new ParseFilePipe({
    validators: createFileValidators(maxSize, fileTypes),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error: string) => {
      console.log('error', error);
      throw new UnprocessableEntityException(error);
    },
    fileIsRequired: true,
  });
