import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.isLoggedInNow().subscribe((res)=>{
      this.isLoggedIn = res
    });
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login'])
  }
}
