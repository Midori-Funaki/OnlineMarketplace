import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';


@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.css']
})
export class CheckoutDetailComponent implements OnInit {
  user: User

  checkoutForm = new FormGroup({
    billInfo: new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      contact: new FormControl(null, Validators.required)
    }),
    shipInfo : new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      contact: new FormControl(null, Validators.required)
    })
  });

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(user=> {
      this.user = user;
    })
  }

  onSubmit() {
    
  }
  
}
