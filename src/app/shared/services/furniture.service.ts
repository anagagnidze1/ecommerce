import { Injectable, signal } from '@angular/core';
import { currentState } from '../enums/enums';
import { EcommerceRestService } from '../../core/services/ecommerce.rest.service';
import { Observable } from 'rxjs';
import { IFurniture } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class furnitureService {
  public currentState = signal(currentState.LOGIN);
  constructor(private furnitureRest: EcommerceRestService) { }

  public getFurniture(): Observable<IFurniture[]>{
    return this.furnitureRest.getFurniture();
  }

  public createFurniture(furniture: IFurniture): Observable<IFurniture> {
    return this.furnitureRest.createFurniture(furniture);
  }

}
