import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import cloudinaryConfiguration from './config';

//Routing imports
import { MainRoutingModule } from './components/main/main-routing.module';

//Component imports
import { AppComponent } from './app.component';
import { routingComponents } from './components/main/main-routing.module';
import { MainComponent } from './components/main/main.component';
import { TopComponent } from './components/top/top.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { LoginComponent } from './components/top/login/login.component';
import { SignupComponent } from './components/top/signup/signup.component';
import { TabsComponent } from './components/main/tabs/tabs.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { ProductDetailComponent } from './components/main/product-detail/product-detail.component';
import { TemporaryComponent } from './components/main/temporary/temporary.component';
import { CartItemComponent } from './components/main/cart/cart-item/cart-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutDetailComponent } from './components/checkout/checkout-detail/checkout-detail.component';
import { CheckoutConfirmComponent } from './components/checkout/checkout-confirm/checkout-confirm.component';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './components/top/notification/notification.component';
import { CartChildComponent } from './components/main/cart/cart-child/cart-child.component';
import { CheckoutCartComponent } from './components/checkout/checkout-cart/checkout-cart.component';


//Service imports
import { FacebookAuthService } from './services/facebook-auth.service';
import { AuthService } from './services/auth.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthGuard } from './services/auth-guard.service';
import { GoogleAuthService } from './services/google-auth.service';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { SellService } from './services/sell.service';
import { TransactionService } from './services/transaction.service';
import { UserService } from './services/user.service';
import { CheckoutService } from './services/checkout.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TopComponent,
    BottomComponent,
    MainComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    TabsComponent,
    TemporaryComponent,
    CartItemComponent,
    CheckoutDetailComponent,
    CheckoutConfirmComponent,
    NotificationComponent,
    CartChildComponent,
    CheckoutCartComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MainRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),
    BrowserAnimationsModule,
  ],
  providers: [
    FacebookAuthService, 
    AuthService,
    OAuthService,
    AuthGuard,
    GoogleAuthService,
    ProductsService,
    CartService,
    SellService,
    TransactionService,
    UserService,
    NotificationService,
    CheckoutService,
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
