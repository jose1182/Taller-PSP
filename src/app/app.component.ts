import { LoginService } from './services/login.service';
import { LoginModel } from './model/login.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tallerAngular';

  user!: LoginModel | null

  constructor(private loginService: LoginService){
    loginService.login.subscribe(user => this.user = user)
  }

  isAuthenticated() : boolean {
    return this.user != null
  }

  logout(): void{
   this.loginService.performLogout();
  }

}
