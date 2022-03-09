import { AuthguardGuard } from './guards/authguard.guard';
import { LoginComponent } from './components/login/login.component';
import { ImagesComponent } from './components/images/images.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'

  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthguardGuard]
  },
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
