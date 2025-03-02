import { Injectable } from '@angular/core';
import { IFurniture } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items: IFurniture[] = [];

  constructor() { }

  addToCart(furniture: IFurniture){
    this.items.push(furniture);
  }
  getCartItems(): IFurniture[] {
    return this.items;
  }
  delete(furniture: IFurniture){
    this.items = this.items.filter(item => item.id !== furniture.id);
  }
}
