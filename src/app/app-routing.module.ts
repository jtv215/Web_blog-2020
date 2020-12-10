import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'inicio', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'registro', component: RegisterComponent},
 // {path:'logout/:sure', component: LoginComponent},
 {path:'ajustes', component: UserEditComponent},




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
