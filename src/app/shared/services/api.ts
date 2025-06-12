import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Api {
  constructor(
    private http: HttpClient,
    private url: string
  ) {}

  get<T>(params?: any): Observable<T> {
    return this.http.get<T>(this.url, { params });
  }

  post<T>(body: any): Observable<T> {
    return this.http.post<T>(this.url, body);
  }

  put<T>(body: any): Observable<T> {
    return this.http.put<T>(this.url, body);
  }

  delete<T>(): Observable<T> {
    return this.http.delete<T>(this.url);
  }
}
