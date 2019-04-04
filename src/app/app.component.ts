import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '@app/app.config';

import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  showSplash = true;
  version = '0.0.1-public';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      timer(3000).subscribe(() => {
        this.showSplash = false;
      });
    });
    this.translate.setDefaultLang(APP_CONSTANTS.DEFAULT_LANGUAGE);
    this.translate.use(APP_CONSTANTS.DEFAULT_LANGUAGE);
  }
}
