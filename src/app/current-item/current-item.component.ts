import { Component, OnInit } from '@angular/core';
import { IFurniture } from '../shared/interface/interfaces';
import { furnitureService } from '../shared/services/furniture.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-current-item',
  imports: [NavigationComponent],
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
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.furnitureService.getFurnitureById(id).subscribe((item) => {
          this.furnitureService.currentItem.set(item);
          this.currentItem = this.furnitureService.currentItem();
        });
      }
    });
  }
  viewItem(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/current-item', id]);
    }
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
