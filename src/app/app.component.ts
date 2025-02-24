import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { currentState } from './shared/enums/enums';
import { FurnitureComponent } from './furniture/furniture/furniture.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RegisterComponent, FurnitureComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'ecommerce';

  public loginPage = true;

  public currentState = currentState;

  constructor(public userService: UserService){
    console.log("app component innited")
  }


  public goToLogin(){
    this.loginPage = true;
    console.log("app component")
  }
  public register(){
    this.loginPage = false;
    console.log("app component register")
  }


}
