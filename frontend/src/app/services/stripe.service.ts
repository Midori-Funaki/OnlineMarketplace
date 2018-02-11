import { Injectable } from '@angular/core';
import config from './../payment-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class StripeService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  register(token: string): Observable<any> {
    return this.http.post<string>('/api/stripe/register', { token: token }, {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

}
