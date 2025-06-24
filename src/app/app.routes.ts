import { Routes } from '@angular/router';

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
  },
  {
    path: 'cart',
    loadComponent: () => import('./body/cart/cart').then((c) => c.Cart),
  },
];
