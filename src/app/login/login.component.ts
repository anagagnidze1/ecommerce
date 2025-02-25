import { Component, signal} from '@angular/core';
import { LoginRegister } from '../login-register-form/login-register.abstract-class';
import { FormsModule } from '@angular/forms';
import { catchError, delay, finalize, of, Subject, tap } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';

interface IUser{
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent extends LoginRegister{

  private mySubj = new Subject<IUser>();

  public loginFailed = signal(false);

  public username!: string
  public password!: string

  constructor(public userService: UserService, private router: Router){
    super()

    this.mySubj.subscribe((value) => {
      console.log(value);
    });

  }
  public login(){
    if(this.username && this.password){
      this.userService.showSpinner.set(true);
      this.userService.getUser().pipe(
        delay(2000),
        tap(users => {
          const user = users.find((user) => {
            return user.username === this.username && user.password === this.password
          })
          if(user){
            this.userService.loggedUser.set(user);
            this.router.navigateByUrl('/furnitures');
          }else{
            this.loginFailed.set(true);
          }
        }),
        catchError(() =>{
          this.loginFailed.set(true);
          return of();
        }),
        finalize(() => {
          this.userService.showSpinner.set(false);
        })
      ).subscribe()  
    }else{
      this.loginFailed.set(true);
    }
    
  }
  public register(){
    this.router.navigateByUrl('/register');
  }

}
