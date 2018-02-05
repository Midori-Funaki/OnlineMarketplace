import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    private checkoutService: CheckoutService,

  ) { }

  ngOnInit() {
  }


}
