import { Component, inject } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { IFurniture } from '../shared/interface/interfaces';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);

  deleteFromCart(furniture: IFurniture){
    this.cartService.delete(furniture);
  }

}
