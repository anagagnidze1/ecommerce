import { Injectable, signal } from '@angular/core';
import { currentState } from '../enums/enums';
import { EcommerceRestService } from '../../core/services/ecommerce.rest.service';
import { Observable } from 'rxjs';
import { IFurniture } from '../interface/interfaces';
import { IUserRegistration } from '../interface/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentState = signal(currentState.LOGIN);
  constructor(private furnitureRest: EcommerceRestService) { }

  public getFurniture(): Observable<IFurniture[]>{
    return this.furnitureRest.getFurniture();
  }

  public createUser(user: IUserRegistration): Observable<IUserRegistration> {
    return this.furnitureRest.createUser(user);
  }

}
