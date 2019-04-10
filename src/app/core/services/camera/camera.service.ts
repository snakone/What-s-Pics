import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable()

export class CameraService {

  options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.CAMERA
  };

  constructor(private camera: Camera,
              private file: File) { }

  openCamera(): Promise<CameraResponse> {
    return new Promise<CameraResponse>((res, rej) => {
      this.camera.getPicture(this.options).then((data: string) => {
        const filename = data.substring(data.lastIndexOf('/') + 1);
        const path = data.substring(0, data.lastIndexOf('/') + 1);
        this.file.readAsDataURL(path, filename).then(file => {
          const response: CameraResponse = {
            name: filename,
            image: file,
            size: Number(file.length / 1024)
          };
          res(response);
        });
      }, (err) => {
          rej('Error. Cannot get picture. Cordova Plugin Camera');
          console.log(err);
      });
    });
  }
}

export interface CameraResponse {
  name: string;
  image: string;
  size: number;
}
