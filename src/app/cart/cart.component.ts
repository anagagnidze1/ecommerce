import { Component, inject } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { IFurniture } from '../shared/interface/interfaces';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  constructor(private router: Router, private userServ: UserService) {}
  deleteFromCart(furniture: IFurniture) {
    this.cartService.delete(furniture);
  }
  public logout(): void {
    this.userServ.logout();
  }
  viewItem(id: number): void {
    this.router.navigate(['/current-item', id]);
  }
  goToUserInfo(): void {
    console.log('Navigating to user-info...');
    this.router.navigate(['/user-info']);
  }
}
