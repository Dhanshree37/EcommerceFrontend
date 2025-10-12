import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { ServerError } from './server-error/server-error';

export const ERROR_ROUTES: Routes = [
  { path: 'not-found', component: NotFound },
  { path: 'server-error', component: ServerError }
];
