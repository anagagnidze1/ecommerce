import { Component, inject } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { IFurniture } from '../shared/interface/interfaces';
import { Router} from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,NavigationComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  constructor(private router: Router) {}

  deleteFromCart(furniture: IFurniture) {
    this.cartService.delete(furniture);
  }
  viewItem(id: number): void {
    this.router.navigate(['/current-item', id]);
  }
}
