import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name: 's3Image'
})

export class S3ImagePipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  transform(value: string, args?: any): any {
    if (!value) { return 'assets/img/slides/slide1.png'; }
    return this.http.get(value, { responseType: 'text' })
      .pipe(map(res => {
        if (!res) {
          return 'assets/img/slides/slide1.png';
        }
        return res;
      }), catchError(err => {
        return 'assets/img/slides/slide1.png';
      }) );
  }

}
