import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { MainComponent } from './components/main/main.component';
import { GoogleComponent } from './components/google/google.component';
<<<<<<< HEAD
import { TabsComponent } from './components/tabs/tabs.component';
=======
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
>>>>>>> 3df8526478c0bc8da848fecfae57a84284b2ba2d


const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'auth/facebook/callback',component: FacebookComponent},
    {path: 'auth/google/callback',component: GoogleComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
<<<<<<< HEAD
    {path: 'main', component: MainComponent, canActivate:[AuthGuard]},
    {path: 'tabs', component: TabsComponent}
=======
    {path: 'main', component: MainComponent},
>>>>>>> 3df8526478c0bc8da848fecfae57a84284b2ba2d
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