import { environment } from './../../environments/environment';
import { LoginModel } from './../model/login.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';


// si algo es succectible mejor crear una constante
const LOGIN_KEY ='login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // un objeto que se comportara como observable y como observador
  private loginModelBehaviorSubject: BehaviorSubject<LoginModel | null>

  public login: Observable<LoginModel | null> // Hay alguien logado?

  //inhjectamos en servico router y HttpCient
  constructor(private http: HttpClient, private route: Router) { 
    //inicializar 
    this.loginModelBehaviorSubject = new BehaviorSubject<LoginModel | null>(JSON.parse(<string>localStorage.getItem(LOGIN_KEY))); //TODO
    this.login = this.loginModelBehaviorSubject.asObservable();

  }

  //Nos tenemos que suscribir al abservable
  performLogin(entrada: LoginModel): Observable<LoginModel>{
    //vamos a devolver el modelo tipo <LoginModel>
    return this
    .http
    .post<LoginModel>(environment.loginUrl, entrada)
    .pipe(map(respond => {
      console.log('Login OK: ' + JSON.stringify(respond));
      //emitir información a los suscriptores
      this.loginModelBehaviorSubject.next(respond);
      localStorage.setItem(LOGIN_KEY, JSON.stringify(respond));
      return respond;
    }))
    
  }

  perfomLogout(){
    localStorage.removeItem(LOGIN_KEY);
    this.loginModelBehaviorSubject.next(null);
    this.route.navigate(['/login']);
  }
}
