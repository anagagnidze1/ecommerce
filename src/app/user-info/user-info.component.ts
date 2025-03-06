import { Component, OnInit, signal } from '@angular/core';
import { userForm } from '../shared/user-form/user-form.class';
import { UserService } from '../shared/services/user.service';
import { NgClass } from '@angular/common';
import { ErrorComponent } from '../shared/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IUserRegistration } from '../shared/interface/users';
import { catchError, delay, finalize, of, tap } from 'rxjs';
import { Router} from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-user-info',
  imports: [NgClass, ErrorComponent, ReactiveFormsModule,NavigationComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent extends userForm implements OnInit {
  public editForm = signal(false);

  constructor(private userService: UserService, private router: Router) {
    super();
  }

  public ngOnInit() {
    this.userForm.patchValue(this.userService.loggedUser());
    this.userForm.disable();
  }

  public edit(edit: boolean) {
    this.editForm.set(edit);
    if (edit) {
      this.userForm.enable();
    } else {
      this.userForm.disable();
    }
  }

  public update() {
    if (this.userForm.valid) {
      this.userService.showSpinner.set(true);
      const userInfo = {
        ...this.userService.loggedUser(),
        ...this.userForm.value,
      };
      this.userService
        .updateUser(userInfo as IUserRegistration)
        .pipe(
          delay(2000),
          tap((user) => {
            this.edit(false);
            this.userService.loggedUser.set(user);
          }),
          catchError((error) => {
            return of();
          }),
          finalize(() => this.userService.showSpinner.set(false))
        )
        .subscribe();
    }
  }
}
