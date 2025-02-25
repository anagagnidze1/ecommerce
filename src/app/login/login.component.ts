import { Component} from '@angular/core';
import { LoginRegister } from '../login-register-form/login-register.abstract-class';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

interface IUser{
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent extends LoginRegister{

  private mySubj = new Subject<IUser>();

  public username!: string
  public password!: string

  constructor(public userService: UserService, private router: Router){
    super()

    this.mySubj.subscribe((value) => {
      console.log(value);
    });

  }
  public login(){
    this.router.navigateByUrl('/furnitures');

  }
  public register(){
    this.router.navigateByUrl('/register');
  }

}
