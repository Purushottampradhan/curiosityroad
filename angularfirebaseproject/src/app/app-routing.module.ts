import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import {SigninComponent} from "./signin/signin.component"
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'product',
    canActivate:[AuthGuard],
    component:ProductComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"home/:id",
    component:ProductdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
