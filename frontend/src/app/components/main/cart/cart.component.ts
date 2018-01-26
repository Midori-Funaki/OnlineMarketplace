import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Observable<Product[]>;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.cartService.getItems().subscribe(items => {
      console.log(items);
    });
  }

}
