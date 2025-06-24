import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientServices {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sellers`, user).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }
}
