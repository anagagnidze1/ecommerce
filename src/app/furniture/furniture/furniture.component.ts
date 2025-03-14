import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { IFurniture } from '../../shared/interface/interfaces';
import { furnitureService } from '../../shared/services/furniture.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-furniture',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.scss',
  standalone: true,
})
export class FurnitureComponent implements OnInit {
  public users = new BehaviorSubject<IFurniture[]>([]);
  private destroy$ = new Subject<void>();
  public furniture$ = new BehaviorSubject<IFurniture[]>([]);

  constructor(
    public furnitureService: furnitureService,
    public cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    public userServ: UserService
  ) {}
  public ngOnInit() {
    this.furniture$.next(this.route.snapshot.data['furnitures']);
  }

  viewItem(id: number): void {
    this.router.navigate(['/current-item', id]);
  }
  addToCart(furniture: IFurniture) {
    this.cartService.addToCart(furniture);
  }

  delete(furniture: IFurniture) {
    this.cartService.delete(furniture);
  }

  public getFurniture(): void {
    this.furnitureService
      .getFurniture()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error fetching customers: ', error);
          return of([]);
        }),
        tap((furniture: IFurniture[]) => {
          this.furniture$.next(furniture);
        })
      )
      .subscribe();
  }
  public logout(): void {
    this.userServ.logout();
  }
  goToUserInfo(): void {
    this.router.navigate(['/user-info']);
  }

  public scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
