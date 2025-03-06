import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRegistration } from '../interface/users';
import { userRestService } from '../../core/services/user.rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public showSpinner = signal(false);
  public loggedUser = signal<IUserRegistration>({} as IUserRegistration);
  constructor(private UsersRest: userRestService, private router: Router) {
    this.loggedUser.set(
      JSON.parse(localStorage.getItem('user') as string) || {}
    );
  }

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

  public logout(): void {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('user');
  }

  public get userLogged(): boolean {
    return !!this.loggedUser().id;
  }
}
