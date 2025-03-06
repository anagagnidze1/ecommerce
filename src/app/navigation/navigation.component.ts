import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule,RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true
})
export class NavigationComponent {
  constructor(private router: Router, private userServ: UserService){}
  goToUserInfo(): void {
    this.router.navigate(['/user-info']);
  }
  public logout(): void {
    this.userServ.logout();
  }
  
}
