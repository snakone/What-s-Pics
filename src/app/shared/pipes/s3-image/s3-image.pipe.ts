import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 's3Image'
})

export class S3ImagePipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  transform(value: string): Observable<string> {
    if (!value) { return of('assets/img/no-image.jpg'); }
    return this.http.get(value, { responseType: 'text' })
      .pipe(map((res: string) => {
        if (!res) {
          return 'assets/img/no-image.jpg';
        }
        return res;
      }), catchError(err => {
        return 'assets/img/no-image.jpg';
    }));
  }

}
