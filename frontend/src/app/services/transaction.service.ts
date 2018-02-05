import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";
import { Transaction } from '../models/Transaction';

@Injectable()
export class TransactionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })
  }
  orderId: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll():Observable<Transaction[]>{
    return this.http.get<Transaction[]>('/api/transactions', {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

  create(transaction): Observable<Transaction> {
    transaction.orderId = this.orderId;
    console.log(transaction);
    return this.http.post<Transaction>('/api/transactions', transaction, this.httpOptions);
  }

  
}
