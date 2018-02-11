import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from './../payment-config';
import { CartService } from './cart.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';
import { AuthService } from "./auth.service";
import { TransactionService } from './transaction.service';
import { Router } from '@angular/router';

@Injectable()
export class CheckoutService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })
  }

  token: string;
  total: number;
  transferObject: any;
  orderId: string;
  paymentComplete$ = new Subject<any>();

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router,
  ) { }

  getCartItems() {
    return this.cartService.getItems();
  }

  openCheckout(total) {
    // return this.http.get('/api/checkout');
    this.total = total;
    // this.transferObject = transferObject;
    let orderId = this.newOrderID();
    this.orderId = orderId;
    this.transactionService.orderId = orderId;
    let handler = (<any>window).StripeCheckout.configure({
      key: config.publish_key,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      currency: 'hkd',
      token: (token: any) => {
        // console.log(total, token, orderId, transferObject);
        this.token = token;
        this.postCharge();
      }
    });

    handler.open({
      name: 'Dealshub.space',
      description: 'Checkout Order id: ' + orderId,
      amount: total
    });
  }

  postCharge() {
    // console.log(this.token);
    this.http.post('/api/stripe/charge/', {
      totalAmount: this.total,
      token: this.token,
      orderId: this.orderId,
      transferObject: this.transferObject
    }, this.httpOptions).subscribe(charge => {
      this.paymentComplete$.next(charge);
    });
  }

  createTransfer(id) {
    return 
  }

  emptyCart() {
    return this.http.delete('/api/carts/', this.httpOptions);
  }

  private newOrderID(): string {
    var ID = function () {
      return Math.random().toString(36).substr(2, 9);
    };
    return ID();
  }

}
