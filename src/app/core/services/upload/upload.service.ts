import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '@app/app.config';
import { StorageService } from '../../storage/storage.service';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';

@Injectable()

export class UploadService {

  readonly API_UPLOAD = APP_CONSTANTS.END_POINT + 'upload';

// tslint:disable-next-line: deprecation
  constructor(private transfer: FileTransfer,
              private storage: StorageService) { }

  uploadImage(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-Token': this.storage.getToken()
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.upload(img, this.API_UPLOAD, options)
      .then((data) => {
        console.log(data);
      }, (err) => {
          console.log(err);
      });
  }
}
