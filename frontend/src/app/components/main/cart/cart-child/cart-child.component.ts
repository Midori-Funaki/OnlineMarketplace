import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-child',
  templateUrl: './cart-child.component.html',
  styleUrls: ['./cart-child.component.css']
})
export class CartChildComponent implements OnInit {
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
        this.grandTotal += item.Product.curentBidPrice * item.quantity;
      } 
    })
  }

  

}
