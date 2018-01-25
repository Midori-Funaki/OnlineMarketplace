import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SellService {

  category$: Subject<string>;

  constructor(private http:HttpClient) { }

  getCategories():Observable<string[]>{
    return this.http.get<string[]>('/api/categories/')
  }

  getBrandsByCategory(categoryTitle:string){
    return this.http.get<string[]>('/api/categories/brands/'+categoryTitle)
  }
}
