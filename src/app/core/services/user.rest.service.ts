import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../apiUrls';
import { Observable } from 'rxjs';
import { IUserRegistration } from '../../shared/interface/users';

@Injectable({
  providedIn: 'root',
})
export class userRestService {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<IUserRegistration[]> {
    return this.http.get<IUserRegistration[]>(apiUrls.users);
  }

  public getUserById(id: number): Observable<IUserRegistration> {
    return this.http.get<IUserRegistration>(`${apiUrls.users}/${id}`);
  }

  public createUser(customer: IUserRegistration): Observable<IUserRegistration> {
    return this.http.post<IUserRegistration>(apiUrls.users, customer);
  }

  public updateUser(customer: IUserRegistration): Observable<IUserRegistration> {
    return this.http.put<IUserRegistration>(
      `${apiUrls.users}/${customer.id}`,
      customer
    );
  }

  public deleteUser(id: number): Observable<IUserRegistration> {
    return this.http.delete<IUserRegistration>(`${apiUrls.users}/${id}`);
  }
}