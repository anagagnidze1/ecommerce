import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'ecommerce';

  public loginPage!: boolean;


  constructor(){
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
