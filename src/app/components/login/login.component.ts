import { ErrorModel } from './../../model/error.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/model/login.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  submitted = false
  loading = false
  error: ErrorModel | null = null

  constructor( 
    private formBuilder: FormBuilder, 
    private loginService: LoginService
  ) { 
    
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.submitted = true
    
    if(this.loginForm.invalid){
      return
    }

    this.loading = true

    this.loginService.performLogin(new LoginModel(this.f.username.value,this.f.password.value, ''))
    .pipe(first())
    .subscribe( 
      data =>{
        console.log('data: ', data)
        this.error = null
    },
      error => {
        console.log('error: ',error)
        this.error = error
        console.log(this.error)
        this.loading = false
    });
  }

}
