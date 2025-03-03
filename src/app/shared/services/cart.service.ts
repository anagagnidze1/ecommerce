import { Injectable } from '@angular/core';
import { IFurniture } from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public items: IFurniture[] = [];

  constructor() {
    this.items = JSON.parse((localStorage.getItem('items') as string) || '[]');
  }

  addToCart(furniture: IFurniture) {
    this.items.push(furniture);
    localStorage.setItem('items', JSON.stringify(this.items));
  }
  getCartItems(): IFurniture[] {
    return this.items;
  }
  delete(furniture: IFurniture) {
    this.items = this.items.filter((item) => item.id !== furniture.id);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  checkIfFurnitureIsAddedToCart(furniture: IFurniture): boolean {
    return !!this.items.find((furn) => furn.id === furniture.id);
  }
}
