import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { MainComponent } from './components/main/main.component';
import { GoogleComponent } from './components/google/google.component';
import { TabsComponent } from './components/tabs/tabs.component';


const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'auth/facebook/callback',component: FacebookComponent},
    {path: 'auth/google/callback',component: GoogleComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'main', component: MainComponent, canActivate:[AuthGuard]},
    {path: 'tabs', component: TabsComponent}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}
export const routingComponents = [LoginComponent, 
                                  SignupComponent, 
                                  FacebookComponent, 
                                  MainComponent, 
                                  GoogleComponent,
                                  TabsComponent]