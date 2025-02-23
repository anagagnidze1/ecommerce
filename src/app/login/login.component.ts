import { Component} from '@angular/core';
import { LoginRegister } from '../login-register-form/login-register.abstract-class';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { currentState } from '../shared/enums/enums';

interface IUser{
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends LoginRegister{

  private mySubj = new Subject<IUser>();

  public username!: string
  public password!: string

  constructor(public userService: UserService){
    super()

    this.mySubj.subscribe((value) => {
      console.log(value);
    });

  }
  public login(){
    console.log("Before:", this.userService.currentState());
    this.userService.currentState.set(currentState.FURNITURE);
    console.log("After:", this.userService.currentState());

  }
  public register(){
    this.userService.currentState.set(currentState.REGISTER);
  }

}
