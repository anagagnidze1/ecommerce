import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { IFurniture } from '../../shared/interface/interfaces';
import { furnitureService } from '../../shared/services/furniture.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';



@Component({
  selector: 'app-furniture',
  imports: [AsyncPipe],
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.scss',
  standalone: true
})
export class FurnitureComponent implements OnInit {
  public users = new BehaviorSubject<IFurniture[]>([])
  private destroy$ = new Subject<void>();
  public furniture$ = new BehaviorSubject<IFurniture[]>([]);

  CartService = inject(CartService)

  constructor(public furnitureService: furnitureService, private router: Router, private route: ActivatedRoute) {

    console.log("FurnitureComponent initialized!");
    
  }
  public ngOnInit() {
    console.log('active route:' , this.route)
    this.furniture$.next(this.route.snapshot.data['furnitures'])
    // this.getFurniture();
  }

  viewItem(id: number): void{
    this.router.navigate(['/current-item', id]);
  }
  addToCart(furniture: IFurniture){
    this.CartService.addToCart(furniture);
    this.router.navigate(['/cart']);
  }


  public getFurniture(): void{
    this.furnitureService
      .getFurniture()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error fetching customers: ', error);
          return of([]);
        }),
        tap((furniture: IFurniture[]) => {
          console.log('customers: ', furniture);
          this.furniture$.next(furniture);
        })
      )
    .subscribe();
  }
}
