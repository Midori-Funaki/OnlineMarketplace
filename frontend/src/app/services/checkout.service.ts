import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CheckoutService {

  chargeAmount$: Subject<number>;
  chargeAmount: number;


  constructor(
    private http: HttpClient
  ) { }

  openCheckout() {
    // return this.http.get('/api/checkout');
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_gRoV8PvaQUbswxHlWWLNYhbL',
      locale: 'auto',
      token: function (token: any) {
        
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });
  }

  updateTotal(amount): void {
    this.chargeAmount$.next(amount);
  }

  getChargeAmount() {
    this.chargeAmount$.subscribe(amount => {
      this.chargeAmount = amount;
    })
  }

}
