import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { parse } from 'query-string';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {

  constructor(private authService:AuthService, 
    private router:Router,
    private route:ActivatedRoute) {}

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      console.log('Google navigation')
      this.router.navigate(['/main']);
    }
      this.route.fragment.subscribe((fragment:string)=>{
      this.authService.googleLogin(parse(fragment).access_token);
    });
  }
}
