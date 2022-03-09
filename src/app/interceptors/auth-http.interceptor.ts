import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "../services/login.service";
import {LoginModel} from "../model/login.model";
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  usuario!: LoginModel | null;
  token!: String | undefined;

  constructor(
    public accounttService:LoginService
){
  this.accounttService.login.subscribe(usuario => {
    this.usuario = usuario;
    this.token = this.usuario?.token;
    console.log('usuario: ', this.usuario)
  });
}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

  let loginValue = this.accounttService.loginValue();
  let token = loginValue?.token;


  if(loginValue && token){
    request = request.clone({
      setHeaders: {
        //Authorization: `Basic ${this.token}` // Añado token
        Authorization: 'Basic ' + token
        }
    });
  }else{
    console.log('La petición no requiere autorización');
  }

    return next.handle(request);
}
}
