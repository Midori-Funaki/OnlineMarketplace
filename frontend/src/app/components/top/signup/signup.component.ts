import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidation } from '../../../shared/password-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  localSignup: FormGroup;
  signupError: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService, 
              private router: Router) { }

  ngOnInit() {
    this.localSignup = this.formBuilder.group({
      lastname: ["", [Validators.required, Validators.maxLength(25)]],
      firstname: ["", [Validators.required, Validators.maxLength(25)]],
      email: ["", Validators.required],
      password: ["", Validators.required],
      passwordCheck: ["", [Validators.required]]
    }, { validator: PasswordValidation.MatchPassword });
    this.authService.signupErrorStatus().subscribe((signupError)=>{
      this.signupError = signupError;
    })
  }

  onSubmit(e:any){
    e.preventDefault();
    if (this.localSignup.valid && this.localSignup.dirty){
      this.authService.signup(this.localSignup.value);
    }
  }

}
