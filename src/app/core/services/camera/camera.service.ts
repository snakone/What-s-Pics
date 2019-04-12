import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileResponse } from '@app/shared/interfaces/interfaces';

@Injectable()

export class CameraService {

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
          res(await this.handleMetaData(data));
      }, (err) => {
          rej('Error. Cannot get picture. Cordova Plugin Camera');
          console.log(err);
      });
    });
  }

  public openSource(): Promise<FileResponse> {
    return new Promise<FileResponse>((res, rej) => {
      this.camera.getPicture(this.sourceOpts).then((data: string) => {
        const image = 'data:image/jpg;base64,' + data;
        const metadata: FileResponse = {
          name: new Date().valueOf().toString() + '.jpg',
          image,
          size: Number(image.length / 1024)
        };
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
    return this.file.readAsDataURL(path, filename).then(file => {
      const metadata: FileResponse = {
        name: filename,
        image: file,
        size: Number(file.length / 1024)
      };
      return metadata;
    });
  }

}

