import { LoginComponent } from './components/login/login.component';
import { ImagesComponent } from './components/images/images.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'imagenes',
    component: ImagesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
