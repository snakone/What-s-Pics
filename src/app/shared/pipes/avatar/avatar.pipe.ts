import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})

export class AvatarPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return value = 'assets/img/avatars/' + value;
  }

}
