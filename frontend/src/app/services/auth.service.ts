import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { NotificationService } from './notification.service';
declare var $:any

@Injectable()
export class AuthService {
    token: string = null;
    isLoggedIn: boolean = false;
    isLoggedIn_sub: Subject<boolean>;
    signupError_subj: Subject<boolean>;

    constructor(private router: Router, private http: Http, 
                private notificationService: NotificationService){

        this.isLoggedIn_sub = new Subject<boolean>();
        this.signupError_subj = new Subject<boolean>();
        try{
            this.token = localStorage.getItem('myToken');
        } catch (err) {
            console.log(err);
        }
    }

    loggedIn(){
        this.isLoggedIn = (this.token != null);
        this.isLoggedIn_sub.next(this.isLoggedIn);
    }

    logIn(email: string, password: string){
        return this.http.post('/api/login',{email:email, password:password}).subscribe((res)=>{
            this.token = res.json().token;
            localStorage.setItem('myToken',this.token);
            this.isLoggedIn = true;
            this.isLoggedIn_sub.next(this.isLoggedIn);
            this.router.navigate(['/']);
            this.notificationService.sendSuccessMessage('Login Successful!', 'You can now access your buy and sell functions.');
        },(err)=>{
            this.notificationService.sendErrorMessage('LogIn Failed!', 'Please try again.');
        });
    }

    facebookLogin(access_token){
        return this.http.post('/api/login/facebook',{access_token:access_token}).subscribe((res)=>{
            this.token = res.json().token;
            this.isLoggedIn = true;
            this.isLoggedIn_sub.next(this.isLoggedIn);
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/']);
            this.notificationService.sendSuccessMessage('Login Successful!', 'You can now access your buy and sell functions.');
        },(err)=>{
            this.notificationService.sendErrorMessage('LogIn Failed!', 'Please check your facebook settings.');
        });
    }

    googleLogin(access_token){
        return this.http.post('/api/login/google',{access_token:access_token}).subscribe((res)=>{
            this.token = res.json().token;
            this.isLoggedIn = true;
            this.isLoggedIn_sub.next(this.isLoggedIn);
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/']);
            this.notificationService.sendSuccessMessage('Login Successful!', 'You can now access your buy and sell functions.');
        },(err)=>{
            this.notificationService.sendErrorMessage('LogIn Failed!', 'Please check your google settings.');
        });
    }

    isAuthenticated(){
        this.isLoggedIn = (this.token != null);
        this.isLoggedIn_sub.next(this.isLoggedIn);
        return this.token != null;
    }

    isLoggedInNow(){
        return this.isLoggedIn_sub.asObservable();
    }

    signupErrorStatus(){
        return this.signupError_subj.asObservable();
    }

    logOut(){
        this.token = null;
        this.isLoggedIn = false;
        this.isLoggedIn_sub.next(this.isLoggedIn);
        localStorage.removeItem('myToken');
        this.router.navigate(['/']);
        this.notificationService.sendSuccessMessage('Logout Successful!', 'See you next time.');
    }

    signup(userInfo){
        // console.log(userInfo);
        return this.http.post('/api/users/signup',{user:userInfo}).subscribe((res)=>{
            this.token = res.json().token;
            this.isLoggedIn = true;
            this.isLoggedIn_sub.next(this.isLoggedIn);
            localStorage.setItem('myToken',this.token);
            $('#SignupForm').modal('hide');
            this.notificationService.sendSuccessMessage('Registration Successful!', 'Welcome to Deals Hub.');
        }, (err)=>{
            this.signupError_subj.next(true);
            setTimeout(()=>{
                this.signupError_subj.next(false);
            }, 3000);
        })
    }
}