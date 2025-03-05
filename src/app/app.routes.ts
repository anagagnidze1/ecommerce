import { Routes } from '@angular/router';
import { userLoggedGuard } from './core/guards/user-logged.guard';
import { usersResolver } from './core/resolvers/users.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    title: 'Login',
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    title: 'Register',
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
  },
  {
    title: 'furnitures',
    path: 'furnitures',
    loadComponent: () =>
      import('./furniture/furniture/furniture.component').then(
        (c) => c.FurnitureComponent
      ),
    canActivate: [userLoggedGuard],
    resolve: {
      furnitures: usersResolver,
    },
    data: {
      list: [1, 2, 3],
    },
  },
  {
    title: 'current-item',
    path: 'current-item/:id',
    loadComponent: () =>
      import('./current-item/current-item.component').then(
        (c) => c.CurrentItemComponent
      ),
    canActivate: [userLoggedGuard],
  },
  {
    title: 'cart',
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then((c) => c.CartComponent),
    canActivate: [userLoggedGuard],
  },
  {
    title: 'user-info',
    path: 'user-info',
    loadComponent: () =>
      import('./user-info/user-info.component').then((c) => c.UserInfoComponent),

  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },

];
