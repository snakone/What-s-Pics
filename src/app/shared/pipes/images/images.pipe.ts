import { Pipe, PipeTransform } from '@angular/core';
import { APP_CONSTANTS } from '@app/app.config';

const host = APP_CONSTANTS.END_POINT + 'posts/images';

@Pipe({
  name: 'images'
})

export class ImagesPipe implements PipeTransform {

  transform(img: string, id: string): any {
    return `${host}/${id}/${img}`;
  }

}
