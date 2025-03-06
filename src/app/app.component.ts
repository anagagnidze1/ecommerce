import { Component } from '@angular/core';
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


  constructor(public userService: UserService){}


  public goToLogin(){
    this.loginPage = true;
  }
  public register(){
    this.loginPage = false;
  }
}
