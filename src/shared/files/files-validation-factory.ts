import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';

export const createParseFilePipe = (
  maxSize: number,
  fileType: RegExp | string,
): ParseFilePipe =>
  new ParseFilePipe({
    validators: [
      // 1) validate file size
      new MaxFileSizeValidator({
        maxSize,
        message: (maxSize) =>
          `File is too big. Max file size is ${maxSize} bytes`,
      }),

      // 2) validate file type (extension)
      new FileTypeValidator({ fileType }),

      // 3) custom validation
    ],
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error: string) => {
      console.log('error', error);
      throw new UnprocessableEntityException(error);
    },
    fileIsRequired: true,
  });
