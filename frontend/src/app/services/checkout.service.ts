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

  grandTotal: number;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  getCartItems() {
    return this.cartService.getItems();
  }

  newOrderID(): string {
    var ID = function () {
      return Math.random().toString(36).substr(2, 9);
    };
    return ID();
  }

  openCheckout(total) {
    // return this.http.get('/api/checkout');
    var handler = (<any>window).StripeCheckout.configure({
      key: config.publish_key,
      locale: 'auto',
      currency: 'hkd',
      token: function (token: any) {
        console.log(token);
      }
    });

    handler.open({
      name: 'Dealshub.space',
      description: 'test order',
      amount: total
    });
  }

  //private functions
  private createCharge(totalAmount, transferObject, token) {
    return this.http.post('/api/charges',
      {
        totalAmount: totalAmount,
        transferObject: transferObject,
        token: token
      },
      {
        headers: new HttpHeaders().set(
          'Authorization', 'Bearer ' + this.authService.token)
      }
    )
  }

}
