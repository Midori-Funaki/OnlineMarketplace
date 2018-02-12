import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FacebookAuthService } from '../../../services/facebook-auth.service';
import { GoogleAuthService } from '../../../services/google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  localLogin: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private facebookAuthService: FacebookAuthService,
    private googleAuthService: GoogleAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.localLogin = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required]
    });
  }

  onSubmit(e: any) {
    // console.log(this.localLogin.value);
    if (this.localLogin.valid && this.localLogin.dirty) {
      this.authService.logIn(this.localLogin.value.email, this.localLogin.value.password);
    }
  }

  onLoginWithFacebook(event) {
    this.facebookAuthService.logIn();
  }

  onLoginWithGoogle(event) {
    this.googleAuthService.logIn();
  }
}
