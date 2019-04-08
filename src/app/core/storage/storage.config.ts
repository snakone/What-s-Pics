import { InjectionToken } from '@angular/core';

export interface ModuleConfig {
  KEY: string;
  TOKEN_KEY: string;
}

export interface StorageConfig extends ModuleConfig {
  TOKEN: string;
  LANGUAGE: string;
  TUTORIAL: boolean;
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: 'settings',
  TOKEN_KEY: 'token',
  TOKEN: '',
  LANGUAGE: 'en',
  TUTORIAL: true
};

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
