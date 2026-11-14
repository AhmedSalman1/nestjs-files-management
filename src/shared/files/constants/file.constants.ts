import { FileSizeType } from '../types/file.types.js';

export const MAX_SIZE = '2MB' as const satisfies FileSizeType;

export const MaxFileCount = {
  PRODUCTS_IMAGES: 5,
  USER_AVATAR: 1,
} as const satisfies Record<string, number>;
