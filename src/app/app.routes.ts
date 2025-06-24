import { Routes } from '@angular/router';
import { userAuthGuardGuard } from './user-auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./body/home/home').then((c) => c.Home),
  },
  {
    path: 'home',
    loadComponent: () => import('./body/home/home').then((c) => c.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./body/login/login').then((c) => c.Login),
  },
  {
    path: 'seller',
    loadComponent: () => import('./body/seller/seller').then((c) => c.Seller),
  },
  {
    path: 'seller/home',
    loadComponent: () => import('./body/home/home').then((c) => c.Home),
    canActivate: [userAuthGuardGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./body/cart/cart').then((c) => c.Cart),
  },
];
