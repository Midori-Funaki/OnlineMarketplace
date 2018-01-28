import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Observable<any>;
  grandTotal:number;
  shipping:number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getItems();
    this.getTotal();
  }

  getItems() {
    this.items = this.cartService.getItems();
  }

  getTotal(): void {
    this.items.subscribe(items=> {
      this.grandTotal =0 ;
      for (let item of items) {
        // console.log(item.Product.curentBidPrice);
        this.grandTotal += item.Product.curentBidPrice * item.quantity;
      } 
    })
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout'])
  }
}
