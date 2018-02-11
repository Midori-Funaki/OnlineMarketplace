import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { getParseErrors } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchKey: string;
  products:any;
  // searchEvent= new Subject<any>();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.searchKey = params['searchkey'];
      console.log('searching with ',this.searchKey);
      this.searchItems(this.searchKey);
    });
  }

  searchItems(keywords){
    this.productService.getSearchedProduct(keywords).subscribe((result) => {
      this.products = result;
      // console.log(this.products);
      // location.reload();
      this.productService.searchEvent$.next(this.products);
    })
  }

}
