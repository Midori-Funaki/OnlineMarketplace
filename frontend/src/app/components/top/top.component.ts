import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedInNow().subscribe((res)=>{
      this.isLoggedIn = res
    });
  }

  ngOnInit() {
    this.authService.loggedIn();
  }

  logOut(){
    this.authService.logOut();
  }

}
