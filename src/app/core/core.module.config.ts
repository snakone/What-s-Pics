import { ModuleConfig } from '@app/app.config';
import { InjectionToken } from '@angular/core';

export interface CoreModuleConfig extends ModuleConfig {
  TRANSLATE_CONFIG: {
    I18N_PATH: string,
    SUFFIX_FILE: string
  };
}

export const CORE_MODULE_CONSTANTS: CoreModuleConfig = {
  TRANSLATE_CONFIG: {
    I18N_PATH: 'assets/i18n/',
    SUFFIX_FILE: '-lang.json'
  }
};

export let CORE_MODULE_CONFIG = new InjectionToken<CoreModuleConfig>('core.module.config');
