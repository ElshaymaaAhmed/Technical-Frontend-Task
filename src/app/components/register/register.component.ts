import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/validators/confirmPasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private fb:FormBuilder,
    private router:Router
    ) {}

  RegistrationForm = this.fb.group({

    userName:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]],
    password:['',[Validators.required,Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )]],
    confirmPassword:['',[Validators.required]]
  },{validator:[ConfirmPasswordValidator]});

  get userName()
  {
    return this.RegistrationForm.get('userName');
  }
  get email()
  {
    return this.RegistrationForm.get('email');
  }
  get password(){
    return this.RegistrationForm.get('password');
  }
  get confirmPassword(){
    return this.RegistrationForm.get('confirmPassword');
  }

  OnSubmit()
  {
    if(!this.RegistrationForm.valid){
      return;
    }
    console.log("valid form");
    
    localStorage.setItem(this.email?.value,JSON.stringify(
      this.RegistrationForm.value));
      console.log(this.RegistrationForm.value);
      
      this.router.navigate(['/login'])
  }
}
