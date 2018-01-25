import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';

@Injectable()
export class CartService {
  constructor(
    private http:HttpClient
  ) { }

  getItems(userId): Observable<Product[]> {
    return this.http.get<Product[]>('/api/carts/'+userId);
  }
  
}
