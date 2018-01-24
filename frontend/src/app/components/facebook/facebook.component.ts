import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { parse } from 'query-string';

@Component({
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor(private authService:AuthService, 
              private router:Router,
              private route:ActivatedRoute) {}
  
    ngOnInit() {
      console.log('loading route');
      if(this.authService.isAuthenticated()){
        this.router.navigate(['/']);
      }
      this.route.fragment.subscribe((fragment:string)=>{
        this.authService.facebookLogin(parse(fragment).access_token);
      });
    }
}
