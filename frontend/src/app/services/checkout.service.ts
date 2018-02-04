import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from './../payment-config';
import { CartService } from './cart.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';
import { AuthService } from "./auth.service";

@Injectable()
export class CheckoutService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })
  }

  grandTotal: number;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  getCartItems() {
    return this.cartService.getItems();
  }

  openCheckout(total, transferObject) {
    // return this.http.get('/api/checkout');
    let orderId = this.newOrderID();
    let handler = (<any>window).StripeCheckout.configure({
      key: config.publish_key,
      locale: 'auto',
      currency: 'hkd',
      token: (token: any) => {
        console.log(total, token, orderId, transferObject);
        return this.http.post('/api/stripe/charge/', {
          totalAmount: total,
          token: token,
          orderId: orderId,
          transferObject: transferObject
        }, this.httpOptions);
      }
    });

    handler.open({
      name: 'Dealshub.space',
      description: 'Checkout Order id: ' + orderId,
      amount: total
    });
  }

  emptyCart() {
    return this.http.delete('/api/carts/', this.httpOptions);
  }
  //private functions

  private newOrderID(): string {
    var ID = function () {
      return Math.random().toString(36).substr(2, 9);
    };
    return ID();
  }

}
