import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';
import { AuthService } from "./auth.service";
import { Cart } from '../models/Cart';

@Injectable()
export class CartService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/carts', {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

  deleteItem(id): Observable<any> {
    return this.http.delete<Cart>('/api/carts/' + id, this.httpOptions);
  }
  
}
