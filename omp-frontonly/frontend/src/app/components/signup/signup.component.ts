import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidation } from '../../shared/password-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  localSignup: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService, 
              private router: Router) { }

  ngOnInit() {
    this.localSignup = this.formBuilder.group({
      username: ["", [Validators.required, Validators.maxLength(25)]],
      email: ["", Validators.required],
      password: ["", Validators.required],
      passwordCheck: ["", [Validators.required]]
    }, { validator: PasswordValidation.MatchPassword });

    if(this.authService.isAuthenticated()){
      this.router.navigate(['main']);
    }
  }

  onSubmit(e:any){
    e.preventDefault();
    console.log(this.localSignup.value);
    if (this.localSignup.valid && this.localSignup.dirty){
      console.log("Yeah submitting form!");
      this.router.navigate(['login']);
    }
  }

}
