import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';
import { AuthService } from "./auth.service";

@Injectable()
export class CartService {


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

}
