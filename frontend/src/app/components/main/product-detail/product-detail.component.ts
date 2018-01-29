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
  quantity:number =1;
  
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  product: Observable<Product>;
  imgsrc: string = "https://picsum.photos/500/500?image=2";

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.getProduct(param['id']);
    })
  }

  getProduct(id) {
    this.product = this.productsService.getProduct(id);
  }

  changeImage(event) {
    this.imgsrc = event.srcElement.src;
  }

  addToCart(id) {
    this.productsService.addToCart({ id:id, quantity: this.quantity}).subscribe(cart => console.log(cart));
  }

}
