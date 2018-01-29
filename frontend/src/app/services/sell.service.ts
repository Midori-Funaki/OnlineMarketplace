import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { AuthService } from "./auth.service";

@Injectable()
export class SellService {

  category$: Subject<string[]>;
  brand$: Subject<string[]>;
  title$: Subject<string[]>;

  constructor(private http:HttpClient, private cloudinary: Cloudinary, private authService: AuthService) { 
    this.category$ = new Subject<string[]>(); 
    this.brand$ = new Subject<string[]>();
    this.title$ = new Subject<string[]>();
  }

  getcategorySub():Observable<string[]>{
    return this.category$.asObservable();
  }

  getbrandSub():Observable<string[]>{
    return this.brand$.asObservable();
  }

  gettitleSub():Observable<string[]>{
    return this.title$.asObservable();
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

  getTitlesByBrands(categoryTitle:string, brand:string){
    this.http.get<string[]>('/api/categories/titles/'+categoryTitle+'/'+brand).subscribe(result=>{
      this.title$.next(result);
    })
  }

  registerNewSell(formValues){
    this.http.post<string[]>('api/products/',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token),
      data: formValues
    }).subscribe(result => {
      console.log('REGISTER NEW POST RESULT ',result);
    })
  }

  deleteImageById(url){
    return this.http.delete('api/images/' + url)
  }

  upload(){
    console.log('received image data *****');
  }
}
