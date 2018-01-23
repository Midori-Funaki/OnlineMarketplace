import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FacebookAuthService } from '../../services/facebook-auth.service';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  localLogin: FormGroup

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService, 
              private facebookAuthService: FacebookAuthService,
              private googleAuthService: GoogleAuthService,
              private router: Router,) {}

  ngOnInit() {
    this.localLogin = this.formBuilder.group({
      username: ["", [Validators.required, Validators.maxLength(25)]],
      password: ["",Validators.required]
    });

    if(this.authService.isAuthenticated()){
      this.router.navigate(['main']);
    }
  }

  onSubmit(e:any){
    e.preventDefault();
    //console.log(this.localLogin.value);
    if (this.localLogin.valid && this.localLogin.dirty){
      this.authService.logIn(this.localLogin.value.username, this.localLogin.value.password);
    }
  }

  onLoginWithFacebook(event){
    this.facebookAuthService.logIn();
  }

  onLoginWithGoogle(event){
    this.googleAuthService.logIn();
  }
}
