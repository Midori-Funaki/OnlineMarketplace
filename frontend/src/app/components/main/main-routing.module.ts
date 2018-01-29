import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';;
import { FacebookComponent } from '../../components/facebook/facebook.component';
import { GoogleComponent } from '../../components/google/google.component';
import { ProductsComponent } from './products/products.component';
import { TemporaryComponent } from './temporary/temporary.component';
import { SellComponent } from './sell/sell.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { FavComponent } from './fav/fav.component';
import { CheckoutComponent } from './../checkout/checkout.component';
import { TransactionComponent } from './../../components/main/transactions/transaction.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ProductsComponent, pathMatch: 'full'},
    { path: 'products/:id', component: ProductDetailComponent, pathMatch: 'full' },
    { path: 'transactions', component: TransactionComponent, pathMatch: 'full' },
    { path: 'sell', component: SellComponent, pathMatch: 'full' },
    { path: 'cart', component: CartComponent,pathMatch: 'full' },
    { path: 'favourites', component: FavComponent, pathMatch: 'full' },
    { path: 'auth/facebook/callback', component: FacebookComponent },
    { path: 'auth/google/callback', component: GoogleComponent },
    { path: 'checkout', component: CheckoutComponent, pathMatch: 'full'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
export const routingComponents = [
    FacebookComponent,
    GoogleComponent,
    ProductsComponent,
    TemporaryComponent,
    ProductDetailComponent,
    CartComponent,
    SellComponent,
    FavComponent,
    CheckoutComponent,
    TransactionComponent
]
