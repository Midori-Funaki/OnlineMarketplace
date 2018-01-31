import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.css']
})
export class CheckoutDetailComponent implements OnInit {
  user: User
  checkoutForm: FormGroup

  constructor(
    private userService: UserService,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.getUser()
      .then(_ => {
        this.checkoutForm = new FormGroup({
          billInfo: new FormGroup({
            firstName: new FormControl(this.user.firstName, Validators.required),
            lastName: new FormControl(this.user.lastName, Validators.required),
            address1: new FormControl(this.user.billingAddress, Validators.required),
            address2: new FormControl(null),
            contact: new FormControl(null, Validators.required)
          }),
          shipInfo: new FormGroup({
            firstName: new FormControl(this.user.firstName, Validators.required),
            lastName: new FormControl(this.user.lastName, Validators.required),
            address1: new FormControl(this.user.shippingAddress, Validators.required),
            address2: new FormControl(null),
            contact: new FormControl(null, Validators.required)
          })
        });
      });
  }

  getUser() {
    return this.userService.getUser().toPromise().then(
      user => {
        this.user = user;
      }
    )
  }

  onSubmit() {
    this.checkoutService.openCheckout()
  }

}
