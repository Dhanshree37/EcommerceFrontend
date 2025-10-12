import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Browser automatically sends cookies
  req = req.clone({ withCredentials: true });
  return next(req);
};
