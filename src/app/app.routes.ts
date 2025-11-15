import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { ERROR_ROUTES } from './core/error-pages/error.routes';

export const routes: Routes = [
  // AUTH PAGES — NO NAVBAR
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },

  // MAIN APP PAGES — WITH NAVBAR
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/product.routes').then(
            (m) => m.PRODUCT_ROUTES
          ),
      },
    ],
  },

  { path: 'error', children: ERROR_ROUTES },
  { path: '**', redirectTo: 'error/not-found' },
];
