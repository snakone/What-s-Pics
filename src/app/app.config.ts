// APP_CONFIG: Injection token to hold application-wide configuration properties that can be injected into other
// application elements such as components or services.

import { InjectionToken } from '@angular/core';

export interface ModuleConfig {
  NAVIGATION?: any;
}

export interface AppConfig extends ModuleConfig {
  TITLE: string;
  DEFAULT_LANGUAGE: string;
  END_POINT: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'What The Pics',
  DEFAULT_LANGUAGE: 'en',
  END_POINT: 'http://localhost:3000/',
  NAVIGATION: {
    EMPTY: '',
    ROOT: '',
    HOME: 'HomePage'
  }
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
