import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item;
  @Output() removeCart = new EventEmitter();
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  deleteItem(id) {
    this.cartService.deleteItem(id).subscribe(res => {
      this.removeCart.emit(null);
    })
  }

}
