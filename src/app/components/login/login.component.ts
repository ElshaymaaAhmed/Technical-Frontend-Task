import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  userStorage:any;

  constructor(
    private fb:FormBuilder,
    private _router:Router,
    private _auth:AuthService
    ) {}
  
  LoginForm = this.fb.group({

    email:['',[Validators.required,Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]],
    password:['',[Validators.required, Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )]]
  });

  get email()
  {
    return this.LoginForm.get('email');
  }
  get password()
  {
    return this.LoginForm.get('password');
  }

  onSubmit(){
    
    if(!this.LoginForm.valid){
      return;
    }
  
    const email = this.email?.value;
    const password = this.password?.value;
  
    if(email !== null && email !== undefined){
      const user = localStorage.getItem(email);

      if(user !== null) {
        const parsedUser = JSON.parse(user);

        if(parsedUser.password === password) {
          this._auth.isLogged = true;
          this._auth.loggedUser = user;

          this._router.navigate(['/pickpoint']);
        }
      }
    }

    this.clearInput();
  }
  
  clearInput() {
    this.LoginForm.get('email')?.reset();
    this.LoginForm.get('password')?.reset();
  }
}
