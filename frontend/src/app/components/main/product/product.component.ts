import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { getParseErrors } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayproducts: string[];
  products: string[];
  counter: number;
  increment: number = 10;
  noResult: boolean = false;
  loadMore: boolean = false;

  @Input() searchKey: string;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.counter = 0;
    if (!this.searchKey) {
      this.getAll();
    } else {
      // call search Service
      console.log('Using the searchkey to get products');
      this.noResult = true;
    }
  }

  getAll() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.InitDisplay();
    })
  }

  InitDisplay() {
    if (!this.products) {
      this.noResult = true;
    } else {
      if (this.products.length > this.increment) {
        this.loadMore = true;
        this.displayproducts = this.products.slice(0, this.increment);
        this.counter += this.increment;
      } else {
        this.displayproducts = this.products.slice(0, this.products.length);
      }
    }
  }

  loadNext() {
    if (this.products.length > (this.counter + this.increment)) {
      this.loadMore = true;
      this.displayproducts = this.products.slice(0, this.increment + this.counter);
      this.counter += this.increment;
    } else {
      this.displayproducts = this.products.slice(0, this.products.length);
      this.loadMore = false;
    }
  }
}