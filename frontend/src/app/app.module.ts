import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Routing imports
import { MainRoutingModule } from './components/main/main-routing.module';

//Component imports
import { AppComponent } from './app.component';
import { routingComponents } from './components/main/main-routing.module';
import { MainComponent } from './components/main/main.component';
import { TopComponent } from './components/top/top.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TabsComponent } from './components/main/tabs/tabs.component';
import { ProductsComponent} from './components/main/products/products.component';

//Service imports
import { FacebookAuthService } from './services/facebook-auth.service';
import { AuthService } from './services/auth.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthGuard } from './services/auth-guard.service';
import { GoogleAuthService } from './services/google-auth.service';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { ProductsService } from './services/products.service';
import { TemporaryComponent } from './components/main/temporary/temporary.component';
import { SellComponent } from './components/main/sell/sell.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TopComponent,
    BottomComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    TabsComponent,
    ProductsComponent,
    TemporaryComponent,
    SellComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MainRoutingModule,
    HttpClientModule
  ],
  providers: [
    FacebookAuthService, 
    AuthService,
    OAuthService,
    AuthGuard,
    GoogleAuthService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
