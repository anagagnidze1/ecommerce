import { Component, OnInit } from '@angular/core';
import { IFurniture } from '../shared/interface/interfaces';
import { furnitureService } from '../shared/services/furniture.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-current-item',
  imports: [RouterLink],
  templateUrl: './current-item.component.html',
  styleUrl: './current-item.component.scss',
  standalone: true,
})
export class CurrentItemComponent implements OnInit {
  public currentItem: IFurniture | null = null;

  constructor(
    private furnitureService: furnitureService,
    private router: Router,
    private route: ActivatedRoute,
    public cartService: CartService,
    private userServ: UserService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.furnitureService.getFurnitureById(id).subscribe((item) => {
          this.furnitureService.currentItem.set(item);
          this.currentItem = this.furnitureService.currentItem();
          console.log('Selected item:', this.currentItem);
        });
      } else {
        console.error('Invalid furniture ID');
      }
    });
  }
  viewItem(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/current-item', id]);
    } else {
      console.error('Furniture ID is undefined!');
    }
  }
  public logout(): void {
    this.userServ.logout();
  }

  goToUserInfo(): void {
    console.log('Navigating to user-info...');
    this.router.navigate(['/user-info']);
  }
  addToCart(item: IFurniture): void {
    this.cartService.addToCart(item);
  }

  deleteFromCart(item: IFurniture): void {
    this.cartService.delete(item);
  }
  isItemInCart(): boolean {
    return this.currentItem
      ? this.cartService.checkIfFurnitureIsAddedToCart(this.currentItem)
      : false;
  }
}
