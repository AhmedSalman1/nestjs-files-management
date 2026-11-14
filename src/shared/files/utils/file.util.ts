import { FileType } from '../types/file.types.js';

export const createFileTypeRegex = (fileTypes: FileType[]): RegExp =>
  new RegExp(`(${fileTypes.join('|')})$`, 'i');
