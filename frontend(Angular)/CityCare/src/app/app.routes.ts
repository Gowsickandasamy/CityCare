import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { authOnlyGuard } from './guards/auth-only.guard';
import { AddOfficerComponent } from './components/add-officer/add-officer.component';
import { ListOfficerComponent } from './components/list-officer/list-officer.component';
import { MapComponent } from './components-library/map/map.component';
import { CreateComplaintComponent } from './components/create-complaint/create-complaint.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';

export const routes: Routes = [
    {path:'register', component:RegisterComponent, canActivate: [authGuard] },
    {path:'login', component:LoginComponent, canActivate: [authGuard] },
    {path:'home',component:HomeComponent, canActivate:[authOnlyGuard]},
    {path:'addOfficer',component:AddOfficerComponent, canActivate:[authOnlyGuard]},
    {path:'officersList',component:ListOfficerComponent,canActivate:[authOnlyGuard]},
    {path:'createComplaint',component:CreateComplaintComponent,canActivate:[authOnlyGuard]},
    {path:'map',component:MapComponent,canActivate:[authOnlyGuard]},
    {path:'complaints',component:ComplaintsComponent, canActivate:[authOnlyGuard]},
    { path: 'edit-complaint/:id', component: CreateComplaintComponent, canActivate: [authOnlyGuard] },
    {path:'**', redirectTo:'login', pathMatch:'full'},
];
