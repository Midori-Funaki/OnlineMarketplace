import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";
import { Transaction } from '../models/Transaction';

@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll():Observable<string[]>{
    return this.http.get<string[]>('api/transactions', {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }
}
