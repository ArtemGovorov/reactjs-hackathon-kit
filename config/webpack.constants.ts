import * as path from 'path';

export const HOST = 'localhost';
export const PORT = process.env.PORT || 8080;

export const BUILD_DIR = path.resolve(__dirname, '..', 'public');
export const APP_DIR = path.resolve(__dirname, '..', 'src');
export const PROJECT_ROOT = path.resolve(__dirname, '..');

export const DEV = process.env.NODE_ENV === 'development';
export const PROD = process.env.NODE_ENV === 'production';
export const TEST = process.env.NODE_ENV === 'test';
export const BASENAME = JSON.stringify(process.env.BASENAME || '');

export const DEVTOOLS: boolean = false;



