import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Cart } from '../../../../models/Cart';
@Component({
  selector: 'app-cart-child',
  templateUrl: './cart-child.component.html',
  styleUrls: ['./cart-child.component.css']
})
export class CartChildComponent implements OnInit {
  items: Cart[]= [];
  grandTotal: number;
  shipping: number = 0;
  // hasItems: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getItems();
    this.getTotal();
  }

  getItems() {
    this.cartService.getItems().subscribe(items => {
      this.items = items;
      this.getTotal();
    });
  }

  onRemoveCart() {
    this.getItems();
  }


  private getTotal(): void {
    // this.items.subscribe(items => {
      this.grandTotal = 0;
      // console.log(items);
      if (this.items.length > 0) {
        // this.hasItems = true;
        for (let item of this.items) {
          // console.log(item);
          this.grandTotal += item.Product.currentAskPrice * item.quantity;
        }
      }
    }
  
}
