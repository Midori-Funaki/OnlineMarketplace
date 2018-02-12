import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  //this is just a wrapper for checkout-detail component and checkout-cart component

  isLoading: boolean;

  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.checkoutService.paymentComplete$.subscribe((price) => {
      if(price) {
        this.isLoading = false;
      }
    })

    this.checkoutService.paymentBegin$.subscribe((price) => {
      if(price) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    })
  }

  

}
