import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
    token: string = null;
    isLoggedIn: boolean = false;
    isLoggedIn_sub: Subject<boolean>;

    constructor(private router: Router, private http: Http){
        this.isLoggedIn_sub = new Subject<boolean>();
        try{
            this.token = localStorage.getItem('myToken');
            this.isLoggedIn = (this.token != null);
            this.isLoggedIn_sub.next(this.isLoggedIn);
        } catch (err) {
            console.log(err);
        }
    }

    logIn(username: string, password: string){
        return this.http.post('/api/login',{username:username, password:password}).subscribe((res)=>{
            this.token = res.json().token;
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/main']);
        },(err)=>{
            alert("Log In Failed!");
        });
    }

    facebookLogin(access_token){
        return this.http.post('/api/login/facebook',{access_token:access_token}).subscribe((res)=>{
            this.token = res.json().token;
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/main']);
        },(err)=>{
            alert("Log In Failed!");
        });
    }

    googleLogin(access_token){
        return this.http.post('/api/login/google',{access_token:access_token}).subscribe((res)=>{
            this.token = res.json().token;
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/main']);
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
        localStorage.removeItem('myToken');
    }
}