export const BLACK = 0xFF000000;
export const WHITE = 0xFFFFFFFF;
export const SIZE = 1000;
export const THREADS = 5; // must be a divisor of SIZE

export const imageOffset = 2 * SIZE * SIZE;
export const syncOffset = imageOffset + 4 * SIZE * SIZE;