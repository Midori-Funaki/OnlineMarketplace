import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { environment } from '../../environments/environment';

@Injectable()
export class FacebookAuthService {
    private oauthService: OAuthService;
    constructor(private router: Router){
        this.oauthService = new OAuthService();
        this.oauthService.loginUrl = "https://www.facebook.com/v2.11/dialog/oauth"
        this.oauthService.redirectUri = window.location.origin + "/auth/facebook/callback";
        this.oauthService.clientId = environment.facebookAppId;
        this.oauthService.scope = "email";
        this.oauthService.setStorage(localStorage);
    }

    logIn(){
        this.oauthService.initImplicitFlow();
    }
    logOut(){
        this.oauthService.logOut();
    }
}