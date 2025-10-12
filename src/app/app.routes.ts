import { Routes } from '@angular/router';
import { ERROR_ROUTES } from './core/error-pages/error.routes';

export const routes: Routes = [
  { path: 'error', children: ERROR_ROUTES },
  { path: '**', redirectTo: 'error/not-found' },
];
