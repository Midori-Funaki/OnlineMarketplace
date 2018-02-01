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
  brandName$: Subject<string>;
  title$: Subject<string[]>;
  color$: Subject<string[]>;

  constructor(private http:HttpClient, private cloudinary: Cloudinary, private authService: AuthService) { 
    this.category$ = new Subject<string[]>(); 
    this.brand$ = new Subject<string[]>();
    this.title$ = new Subject<string[]>();
    this.color$ = new Subject<string[]>();
    this.brandName$ = new Subject<string>();
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

  getColorSub(): Observable<string[]> {
    return this.color$.asObservable();
  }

  getBrandNameSub(): Observable<string> {
    return this.brandName$.asObservable();
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

  getBrandById(id:any) {
    console.log('id @ sell.service ',id);
    this.http.get<string>('/api/categories/name/' + id).subscribe(brand => {
      this.brandName$.next(brand);
    })
  }

  getTitlesByBrands(categoryTitle:string, brand:string){
    this.http.get<string[]>('/api/categories/titles/'+categoryTitle+'/'+brand).subscribe(result=>{
      this.title$.next(result);
    });
  }

  getColor(title:string) {
    this.http.get<string[]>('/api/products/color/'+title).subscribe(result => {
      this.color$.next(result);
    });
  }

  registerNewSell(formValues){
    return this.http.post<string[]>('api/products/', formValues, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token)
    }).subscribe(result => {
      console.log('REGISTER NEW POST RESULT ',result);
    })
  }

  editSellItem(productInfo) {
    console.log('sending id',productInfo.id)
    console.log('sending prodyctInfo @ sell.service',productInfo);
    return this.http.put('api/products/' + productInfo.id, productInfo, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token)
    }).subscribe(result => {
      console.log('PUT REQ RESULT ',result);
    })
  }

  deleteImageByIdFromCloudinary(id){
    return this.http.delete('api/images/' + id)
  }

  deleteImageByIdFromDb(id) {
    return this.http.delete('api/photos/' + id)
  }

  upload(){
    console.log('received image data *****');
  }
}
