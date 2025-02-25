import { Component, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ErrorComponent } from '../shared/error/error.component';
import { NgClass } from '@angular/common';
import { userForm } from '../shared/user-form/user-form.class';
import { IUserRegistration} from '../shared/interface/users';
import { UserService } from '../shared/services/user.service';
import { catchError, delay, finalize, of, tap } from 'rxjs';
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
  public registerFailed = signal(false);


  constructor(public userService: UserService, private router: Router){
    super()


    console.log("component is logged")
  }

  public register(){
    console.log("register");

    if (this.userForm.valid) {
      this.userService.showSpinner.set(true);
      const userInfo = this.userForm.value as IUserRegistration;
      
      console.log('User info:', userInfo);
  
      this.userService.createUser(userInfo).pipe(
        delay(2000),
        tap(() =>{
          this.router.navigateByUrl('/furnitures');
        }),
        catchError((error) => {
          this.registerFailed.set(true);
          return of();
        }),
        finalize(() =>{
          this.userService.showSpinner.set(false);
          if(!this.registerFailed()){
            this.router.navigateByUrl('/furnitures');
          }
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
