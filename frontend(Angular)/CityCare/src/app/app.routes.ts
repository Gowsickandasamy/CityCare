import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'**', redirectTo:'login', pathMatch:'full'},
];
