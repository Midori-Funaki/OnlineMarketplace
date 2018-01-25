import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
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

}
