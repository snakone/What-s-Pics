import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
     return this.http.get<T>(url, { headers, params });
  }
}
