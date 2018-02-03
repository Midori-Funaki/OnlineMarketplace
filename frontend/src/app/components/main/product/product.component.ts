import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { getParseErrors } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Observable<string[]>;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.products = this.productService.getProducts();
  }
}
