import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileResponse } from '@app/shared/interfaces/interfaces';
import { APP_CONSTANTS } from '@app/app.config';

@Injectable()

export class CameraService {

  loading = false;

  cameraOpts: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.CAMERA
  };

  sourceOpts: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };

  constructor(private camera: Camera,
              private file: File) { }

  public openCamera(): Promise<FileResponse> {
    return new Promise<FileResponse>((res, rej) => {
      this.camera.getPicture(this.cameraOpts).then(async (data: string) => {
        this.loading = true;
        res(await this.handleMetaData(data));
      }, (err) => {
          rej('Error. Cannot get picture. Cordova Plugin Camera');
          console.log(err);
      });
    });
  }

  public openSource(): Promise<FileResponse> {
    return new Promise<FileResponse>((res, rej) => {
      this.camera.getPicture(this.sourceOpts).then(async (data: string) => {
        this.loading = true;
        const image = 'data:image/jpg;base64,' + data;
        const metadata: FileResponse = {
          name: new Date().valueOf().toString() + '.jpg',
          image: await this.getSignedRequest(image),
          size: Number(image.length / 1024)
        };
        this.loading = false;
        res(metadata);
      }, (err) => {
        rej('Error. Cordova Plugin ImagePicker');
        console.log(err);
      });
    });
  }

  private async handleMetaData(data: string): Promise<FileResponse> {
    const filename = data.substring(data.lastIndexOf('/') + 1);
    const path = data.substring(0, data.lastIndexOf('/') + 1);
    return this.file.readAsDataURL(path, filename).then(async (file: string) => {
      const metadata: FileResponse = {
        name: filename,
        image: await this.getSignedRequest(file),
        size: Number(file.length / 1024)
      };
      this.loading = false;
      return metadata;
    });
  }

  private getSignedRequest(file: string): Promise<string> {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      const name = new Date().valueOf().toString();
      xhr.open('GET', `${APP_CONSTANTS.END_POINT}sign-s3?file-name=${name}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            this.uploadFile(file, response.signedRequest, response.url)
              .then(url => res(url));
          } else {
            alert('Could not get signed URL.');
            rej();
          }
        }
      };
      xhr.send();
    });
  }

  private uploadFile(file: string, signedRequest, url: string): Promise<string> {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            res(url);
          } else {
            alert('Could not upload file.');
            rej();
          }
        }
      };
      xhr.send(file);
    });
  }

}

