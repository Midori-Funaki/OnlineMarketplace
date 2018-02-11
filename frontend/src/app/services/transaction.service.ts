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

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/transactions', this.httpOptions);
  }

  create(transaction): Observable<Transaction> {
    transaction.orderId = this.orderId;
    // console.log(transaction);
    return this.http.post<Transaction>('/api/transactions', transaction, this.httpOptions);
  }

  toShipping(id): Observable<Transaction> {
    return this.http.put<Transaction>('/api/transactions/' + id, { status: 2 }, this.httpOptions);
  }

  toConfirm(id): Observable<Transaction> {
    return this.http.put<Transaction>('/api/transactions/' + id, { status: 3 }, this.httpOptions);
  }

  toTransfer(id): Observable<any> {
    return this.http.post<any>('/api/stripe/transfers/' + id, null, this.httpOptions);
  }
}
