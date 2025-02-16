import { Component, Output, EventEmitter } from '@angular/core';
import { LoginRegister } from '../login-register-form/login-register.abstract-class';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends LoginRegister{

  @Output() login = new EventEmitter();

  public title!: string 

  public username = new FormControl("username");

  constructor(){
    super()
    console.log("component is logged")
  }

  public register(){
    console.log("register")
    console.log(this.username);
  }

  public loginCheck(){
    console.log("login check");
    this.login.emit();
  }
}
