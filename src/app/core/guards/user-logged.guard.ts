import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

export const userLoggedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const loggedUser =
    userService.loggedUser() ||
    JSON.parse(localStorage.getItem('user') as string);
  userService.loggedUser.set(loggedUser);

  if (!loggedUser) {
    router.navigateByUrl('/login');
  }

  return !!loggedUser;
};
