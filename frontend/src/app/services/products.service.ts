import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Product } from './../models/Product';
import { AuthService } from "./auth.service";
import { Cart } from './../models/Cart';

@Injectable()
export class ProductsService {
  items: string[];
  items$ = new Subject<string[]>();
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

  getProducts(): Observable<string[]> {
    return this.http.get<string[]>('/api/products/');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('/api/products/' + id);
  }

  addToCart(obj: {id: number, quantity: number}): Observable<Cart> {
    console.log("posting")
    return this.http.post<Cart>('/api/carts/', { 
      id: obj.id, 
      quantity: obj.quantity 
    }, this.httpOptions );
  }
}
