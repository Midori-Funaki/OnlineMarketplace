import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User'

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  userProfile: User;

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
