import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SellService {

  category$: Subject<string[]>;
  brand$: Subject<string[]>;

  constructor(private http:HttpClient) { 
    this.category$ = new Subject<string[]>(); 
    this.brand$ = new Subject<string[]>(); 
  }

  getcategorySub():Observable<string[]>{
    return this.category$.asObservable();
  }

  getbrandSub():Observable<string[]>{
    return this.brand$.asObservable();
  }

  getCategories():void{
    this.http.get<string[]>('/api/categories/').subscribe(result=>{
      this.category$.next(result);
    });
  }

  getBrandsByCategory(categoryTitle:string){
    this.http.get<string[]>('/api/categories/brands/'+categoryTitle).subscribe(result=>{
      this.brand$.next(result);
    });
  }

  upload(){
    console.log('received image data *****');
  }
}
