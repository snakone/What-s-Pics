import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '@app/app.config';
import { StorageService } from '../../storage/storage.service';

@Injectable()

export class UploadService {

  readonly API_UPLOAD = APP_CONSTANTS.END_POINT + 'sign-s3?file-name=';

  constructor(private storage: StorageService) { }

}
