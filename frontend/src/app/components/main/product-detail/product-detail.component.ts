import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  quantity: number = 1;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  product: Pro;
  imgsrc: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.getProduct(param['id']);
    })
  }

  getProduct(id) {
    this.productsService.getProduct(id).subscribe(product => {
      this.product = product;
      this.imgsrc = product.ProductPhotos[0].url;
    })
  }

  changeImage(event) {
    console.log(event)
    this.imgsrc = event.srcElement.src;
  }

  addToCart(id) {
    this.productsService.addToCart({ id: id, quantity: this.quantity }).subscribe(cart => console.log(cart));
  }

}
