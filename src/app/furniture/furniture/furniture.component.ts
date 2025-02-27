import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { IFurniture } from '../../shared/interface/interfaces';
import { furnitureService } from '../../shared/services/furniture.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';



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

  constructor(public furnitureService: furnitureService, private router: Router) {

    console.log("FurnitureComponent initialized!");
    
  }
  public ngOnInit() {
    this.getFurniture();
  }

  viewItem(id: number): void{
    this.router.navigate(['/current-item', id]);
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
