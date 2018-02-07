import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { getParseErrors } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchKey: string;
  products:any;
  
  constructor(private route: ActivatedRoute,private router: Router, private productService: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.searchKey = params['searchkey'];
      console.log('searching with ',this.searchKey);
      this.searchItems(this.searchKey);
    });
  }

  searchItems(keywords){
    this.productService.getSearchedProduct(this.searchKey).subscribe((result) => {
      // console.log(result);
      this.products = result;
      console.log(this.products);
    })
  }

}
