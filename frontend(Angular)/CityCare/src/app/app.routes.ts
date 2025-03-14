import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { authOnlyGuard } from './guards/auth-only.guard';
import { AddOfficerComponent } from './components/add-officer/add-officer.component';

export const routes: Routes = [
    {path:'register', component:RegisterComponent, canActivate: [authGuard] },
    {path:'login', component:LoginComponent, canActivate: [authGuard] },
    {path:'home',component:HomeComponent, canActivate:[authOnlyGuard]},
    {path:'addOfficer',component:AddOfficerComponent, canActivate:[authOnlyGuard]},
    {path:'**', redirectTo:'login', pathMatch:'full'},
];
