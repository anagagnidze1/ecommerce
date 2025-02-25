import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRegistration } from '../interface/users';
import { userRestService } from '../../core/services/user.rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private UsersRest: userRestService) {}

  public getUser(): Observable<IUserRegistration[]> {
    return this.UsersRest.getUser();
  }

  public createUser(user: IUserRegistration): Observable<IUserRegistration> {
    return this.UsersRest.createUser(user);
  }

  public updateUser(user: IUserRegistration): Observable<IUserRegistration> {
    return this.UsersRest.updateUser(user);
  }

  public deleteUser(id: number): Observable<IUserRegistration> {
    return this.UsersRest.deleteUser(id);
  }
}
