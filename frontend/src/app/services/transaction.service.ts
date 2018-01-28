import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";

@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll():Observable<any[]>{
    return this.http.get<any[]>('api/transactions', {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }
}
