import { Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ErrorComponent } from '../shared/error/error.component';
import { NgClass } from '@angular/common';
import { userForm } from '../shared/user-form/user-form.class';
import { IUserRegistration} from '../shared/interface/users';
import { UserService } from '../shared/services/user.service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, ErrorComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true
})
export class RegisterComponent extends userForm{

  public title!: string 



  constructor(public userService: UserService, private router: Router){
    super()


    console.log("component is logged")
  }

  public register(){
    console.log("register");
    if (this.userForm.valid) {
      const userInfo = this.userForm.value as IUserRegistration;
      
      console.log('User info:', userInfo);

      this.userService.createUser(userInfo).pipe(
        tap((response: IUserRegistration) =>{
          console.log('Furniture created successfully:', response);
          this.router.navigateByUrl('/furnitures');
        }),
        catchError((error: Error) => {
          console.error('Error creating furniture:', error);
          return of();
        })
      ).subscribe();
    } else {
      console.log('Form is invalid');
    }
  
    
  }
  public login(){
    this.router.navigateByUrl('/login');
  }
}
