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
    this.items.push({...furniture, quantity: 1});
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

  incrementQuantity(id: number){
    let item = this.items.find((i) => i.id === id)
    if (item) {
      item.quantity = (item.quantity ?? 0) + 1;
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }
  decrementQuantity(id:number){
    let item = this.items.find((i) => i.id === id);
    if (item && item.quantity && item.quantity > 1) {
      item.quantity--;
    } else {
      this.items = this.items.filter((i) => i.id !== id);
    }
    localStorage.setItem('items', JSON.stringify(this.items));
  }
  getTotal(){
    return this.items.reduce((acc, item) => {
      return acc + item.price * (item.quantity ?? 1);
    }, 0);
  }
}
