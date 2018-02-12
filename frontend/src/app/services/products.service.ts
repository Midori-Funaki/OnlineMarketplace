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
  searchEvent$ = new Subject();
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }
  onSort$ = new Subject();

  getProducts(): Observable<string[]> {
    return this.http.get<string[]>('/api/products/');
  }

  // getSearchedProduct(searchtype: string, searchkey: string): Observable<any> {
  getSearchedProduct(searchkey: string): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'text/xml');
    // headers.append('words',searchkey);
    // console.log('searchkey @ products.service',searchkey);
    return this.http.get<any>('/api/products/search?query=' + searchkey)
    
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>('/api/products/' + id);
  }

  getSellProducts(): Observable<string[]> {
    return this.http.get<string[]>('/api/products/sell', {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

  addToCart(obj: { id: number, quantity: number, productId: number }): Observable<Cart> {
    return this.http.post<Cart>('/api/carts/', {
      id: obj.id,
      quantity: obj.quantity,
      productId: obj.productId
    }, this.httpOptions);
  }

  addToFav(productId: number) {
    return this.http.post<string>('/api/favourite/', {
      productId: productId
    }, this.httpOptions);
  }

  getFav() {
    return this.http.get<Object[]>('/api/favourite', {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

  getFavId(productId) {
    return this.http.get<Object[]>(`/api/favourite/${productId}`, {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

  removeFav(favouriteId) {
    return this.http.delete<Object[]>(`/api/favourite/${favouriteId}`, {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }
}
