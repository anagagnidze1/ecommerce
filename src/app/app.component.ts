import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FurnitureComponent } from './furniture/furniture/furniture.component';
import { UserService } from './shared/services/user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'ecommerce';

  public loginPage = true;


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
