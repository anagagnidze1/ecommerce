import { Component, Output, EventEmitter} from '@angular/core';
import { LoginRegister } from '../login-register-form/login-register.abstract-class';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

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
  @Output() register = new EventEmitter();

  private mySubj = new Subject<IUser>();

  public username!: string
  public password!: string

  constructor(){
    super()

    this.mySubj.subscribe((value) => {
      console.log(value);
    });

  }
  public login(){
    this.mySubj.next({
      username: this.username,
      password: this.password,
    })
    // console.log(this.username, this.password)

  }
    

}
