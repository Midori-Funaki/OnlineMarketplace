import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { getParseErrors } from '@angular/compiler/src/util';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: string[];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    })
  }

}
