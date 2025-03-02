import { Injectable, signal} from '@angular/core';
import { EcommerceRestService } from '../../core/services/ecommerce.rest.service';
import { map, Observable } from 'rxjs';
import { IFurniture } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class furnitureService {
  public currentItem = signal<IFurniture | null>(null)

  constructor(private furnitureRest: EcommerceRestService) { }

  public getFurniture(): Observable<IFurniture[]>{
    return this.furnitureRest.getFurniture();
  }

  public createFurniture(furniture: IFurniture): Observable<IFurniture> {
    return this.furnitureRest.createFurniture(furniture);
  }
  public getFurnitureById(id: string): Observable<IFurniture | null> {
    return this.furnitureRest.getFurnitureById(id);
  }
  


}
