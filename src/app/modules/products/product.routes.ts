import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetails } from './product-details/product-details';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductList },

  // /products/123
  { path: ':id', component: ProductDetails },
];
