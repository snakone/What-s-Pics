// APP_CONFIG: Injection token to hold application-wide configuration properties that can be injected into other
// application elements such as components or services.

import { InjectionToken } from '@angular/core';

const DEV = 'http://localhost:3000/';
const PRE = 'http://192.168.1.97:3000/';
const PROD = 'https://what-the-pics.herokuapp.com/';
const APP_VERSION = '0.2.1-dev';

export interface ModuleConfig {
  NAVIGATION?: any;
}

export interface AppConfig extends ModuleConfig {
  TITLE: string;
  DEFAULT_LANGUAGE: string;
  END_POINT: string;
  APP_VERSION: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'What\'s Pics',
  DEFAULT_LANGUAGE: 'en',
  END_POINT: PROD,
  APP_VERSION,
  NAVIGATION: {
    EMPTY: '',
    ROOT: '',
    HOME: 'HomePage'
  }
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

