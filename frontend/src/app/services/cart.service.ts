import { Injectable } from '@angular/core';
import { HttpClient, RequestOptions } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';
import { AuthService } from "./auth.service";

@Injectable()
export class CartService {

  headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
  options = new RequestOptions({headers:headers});

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { }

  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/carts');
  }
  
}
