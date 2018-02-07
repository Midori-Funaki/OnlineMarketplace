import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User'

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  userProfile: any ={
    "id": '',
    "userId": "",
    "firstName": "",
    "lastName": "",
    "password": "",
    "email": "",
    "shippingAddress": "",
    "shippingAddress2": "",
    "billingAddress": "",
    "billingAddress2": "",
    "contact": ""
  };

  constructor(
                private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.userProfile = user;
      console.log(this.userProfile);
    });
  }

}
