import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Routing imports
import { MainRoutingModule } from './components/main/main-routing.module';

//Component imports
import { AppComponent } from './app.component';
import { routingComponents } from './components/main/main-routing.module';
import { MainComponent } from './components/main/main.component';
import { TopComponent } from './components/top/top.component';
import { BottomComponent } from './components/bottom/bottom.component';

//Service imports
import { FacebookAuthService } from './services/facebook-auth.service';
import { AuthService } from './services/auth.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthGuard } from './services/auth-guard.service';
import { GoogleAuthService } from './services/google-auth.service';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TopComponent,
    BottomComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    FacebookAuthService, 
    AuthService,
    OAuthService,
    AuthGuard,
    GoogleAuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
