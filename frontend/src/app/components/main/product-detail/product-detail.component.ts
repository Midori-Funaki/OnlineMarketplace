import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductsService } from '../../../services/products.service';
import { NotificationService } from '../../../services/notification.service';
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
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  product: Product;
  imgsrc: string;
  isLoggedIn: boolean;
  notaddedFav: boolean = true;

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.getProduct(param['id']);
      this.productsService.getFavId(param['id']).subscribe((res)=>{
        if (res) {
          this.notaddedFav = false;
        }
      });
    });

    this.authService.isLoggedInNow().subscribe((status)=>{
      this.isLoggedIn = status;
    });
    this.authService.loggedIn();
  }

  getProduct(id) {
    this.productsService.getProduct(id)
      .subscribe(product => {
      this.product = product;
      this.imgsrc = product.ProductPhotos[0].url;
    })
  }

  changeImage(event) {
    this.imgsrc = event.srcElement.src;
  }

  addToCart(id) {
    this.productsService.addToCart({ 
        id: id, 
        quantity: this.quantity, 
        productId: this.product.id 
      })
      .subscribe(_=> {
        this.notificationService.sendSuccessMessage('Product Added!', 'Your product has been added to the cart.');
      });
  }

  addToFav(productId) {
    this.productsService.addToFav(productId).subscribe((res)=>{
      this.notaddedFav = false;
      this.notificationService.sendSuccessMessage('Favourite Added!', 'Now you can view this product in Favourite.');
    })
  }

}
