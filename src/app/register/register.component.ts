import { Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ErrorComponent } from '../shared/error/error.component';
import { NgClass } from '@angular/common';
import { userForm } from '../shared/user-form/user-form.class';
import { currentState } from '../shared/enums/enums';
import { IUserRegistration} from '../shared/interface/users';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, ErrorComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends userForm{

  public title!: string 



  constructor(public userService: UserService){
    super()


    console.log("component is logged")
  }

  public register(){
    console.log("register");
    if (this.userForm.valid) {
      const userInfo = this.userForm.value as IUserRegistration;
      
      console.log('User info:', userInfo);

      this.userService.createUser(userInfo).subscribe({
        next: (response: IUserRegistration) => {
          console.log('Furniture created successfully:', response);
          this.userService.currentState.set(currentState.FURNITURE);
        },
        error: (error: Error) => {
          console.error('Error creating furniture:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  
    
  }
  public login(){
    this.userService.currentState.set(currentState.LOGIN);
  }
}
