import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { environment } from '../../environments/environment';

@Injectable()
export class GoogleAuthService {
    private oauthService: OAuthService
    constructor(private router: Router){
        this.oauthService = new OAuthService();    
        this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth"
        this.oauthService.redirectUri = window.location.origin + "/auth/google/callback";
        this.oauthService.clientId = environment.googleAppId;
        this.oauthService.scope = "email profile";
        this.oauthService.setStorage(localStorage);
    }

    logIn(){
        this.oauthService.initImplicitFlow();
    }
    logOut(){
        this.oauthService.logOut();
    }
}