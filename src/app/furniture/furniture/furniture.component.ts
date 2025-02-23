import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { IFurniture } from '../../shared/interface/interfaces';
import { UserService } from '../../shared/services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-furniture',
  imports: [AsyncPipe],
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.scss'
})
export class FurnitureComponent implements OnInit {
  public users = new BehaviorSubject<IFurniture[]>([])
  private destroy$ = new Subject<void>();
  public furniture$ = new BehaviorSubject<IFurniture[]>([]);

  constructor(public userService: UserService) {
    console.log("FurnitureComponent initialized!");
  }
  public ngOnInit() {
    this.getFurniture();
  }

  public getFurniture(): void{
    this.userService
      .getFurniture()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error fetching customers: ', error);
          return of([]);
        }),
        tap((customers: IFurniture[]) => {
          console.log('customers: ', customers);
          this.furniture$.next(customers);
        })
      )
    .subscribe();
  }
}
