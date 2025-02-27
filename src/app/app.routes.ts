import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FurnitureComponent } from './furniture/furniture/furniture.component';
import { CurrentItemComponent } from './current-item/current-item.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        title: 'Login',
        path: 'login',
        component: LoginComponent
    },
    {
        title: 'Register',
        path: 'register',
        component: RegisterComponent
    },
    {
        title:'furnitures',
        path:'furnitures',
        component: FurnitureComponent
    },
    {
        title: 'current-item',
        path: 'current-item/:id',
        component: CurrentItemComponent
    }
];
