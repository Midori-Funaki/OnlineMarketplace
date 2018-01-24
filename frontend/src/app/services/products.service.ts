import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsService {
  items: string[];
  items$ = new Subject<string[]>();
  constructor(private router:Router, private http:HttpClient) { }

  getProducts(): Observable<string[]> {
    return this.http.get<string[]>('/api/products/');
  }

}
