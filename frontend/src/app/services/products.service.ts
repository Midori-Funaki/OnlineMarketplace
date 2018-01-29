import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Product } from './../models/Product';
import { AuthService } from "./auth.service";

@Injectable()
export class ProductsService {
  items: string[];
  items$ = new Subject<string[]>();
  constructor(
    private router:Router, 
    private http:HttpClient,
    private authService: AuthService
  ) { }

  getProducts(): Observable<string[]> {
    return this.http.get<string[]>('/api/products/');
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>('/api/products/' + id);
  }
  
  getSellProducts(): Observable<string[]> {
    return this.http.get<string[]>('/api/products/sell',{
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

}
