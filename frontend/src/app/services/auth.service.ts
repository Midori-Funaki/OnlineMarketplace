import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthService {
    token: string = null;
    isLoggedIn: boolean = false;
    isLoggedIn_sub: Subject<boolean>;

    constructor(private router: Router, private http: Http, 
                private notificationService: NotificationService){

        this.isLoggedIn_sub = new Subject<boolean>();
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
            this.notificationService.sendSuccessMessage('You have successfully logged In!');
        },(err)=>{
            this.notificationService.sendErrorMessage('LogIn Failed!');
        });
    }

    facebookLogin(access_token){
        return this.http.post('/api/login/facebook',{access_token:access_token}).subscribe((res)=>{
            this.token = res.json().token;
            this.isLoggedIn = true;
            this.isLoggedIn_sub.next(this.isLoggedIn);
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/']);
        },(err)=>{
            alert("Log In Failed!");
        });
    }

    googleLogin(access_token){
        return this.http.post('/api/login/google',{access_token:access_token}).subscribe((res)=>{
            this.token = res.json().token;
            this.isLoggedIn = true;
            this.isLoggedIn_sub.next(this.isLoggedIn);
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['']);
        },(err)=>{
            alert("Log In Failed!");
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

    logOut(){
        this.token = null;
        this.isLoggedIn = false;
        this.isLoggedIn_sub.next(this.isLoggedIn);
        localStorage.removeItem('myToken');
        this.router.navigate(['/']);
    }
}