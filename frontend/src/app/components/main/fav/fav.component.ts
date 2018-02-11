import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  favourite: Object[]=[];
  noResult:boolean = true;

  constructor(
      private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.productsService.getFav().subscribe((res)=>{
      this.favourite = res;
      // console.log(this.favourite);
      if (this.favourite.length) {
        this.noResult = false;
      }
    });
  }

  removeFav(favouriteId){
    this.productsService.removeFav(favouriteId).subscribe((res)=>{
      this.favourite = res;
    })
  }

}
