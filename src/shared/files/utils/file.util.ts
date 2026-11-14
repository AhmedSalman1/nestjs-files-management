import bytes from 'bytes';
import { FileSizeType, FileType } from '../types/file.types.js';

export const createFileTypeRegex = (fileTypes: FileType[]): RegExp =>
  new RegExp(`(${fileTypes.join('|')})$`, 'i');

export const parseFileSize = (size: FileSizeType): number => {
  const parsed = bytes(size);
  if (parsed === null || parsed === undefined || parsed <= 0) {
    throw new Error(`Invalid file size format: "${size}"`);
  }
  return parsed;
};
