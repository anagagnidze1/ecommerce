import { Component, Output, EventEmitter } from '@angular/core';
import { LoginRegister } from '../login-register-form/login-register.abstract-class';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, ErrorComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends LoginRegister{

  @Output() login = new EventEmitter();

  public title!: string 


  public userForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3), usernameValidator()]),
    firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]),

  });

  constructor(){
    super()
    console.log("component is logged")
  }

  public register(){
    console.log("register");
    console.log(this.userForm);
    console.log(this.userForm.valid);
  }

  public loginCheck(){
    console.log("login check");
    this.login.emit();
  }
  public get usernameControl(): FormControl {
    return this.userForm.get('username') as FormControl;
  }
}

function usernameValidator(): (
  contol: AbstractControl
) => ValidationErrors | null {
  return (contol: AbstractControl) => {
    const pattern = /^[a-zA-Z]*$/;

    if (contol.value && !pattern.test(contol.value)) {
      return { onlyLathinLetters: true };
    }

    return null;
  };
}
