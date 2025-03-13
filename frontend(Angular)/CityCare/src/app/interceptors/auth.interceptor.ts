import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const access_token = authService.getAccessToken();

  let modifiedReq = req;

  if(access_token){
    modifiedReq = req.clone({
      setHeaders:{Authorization:`Bearer ${access_token}`}
    })
  }


  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && authService.getRefreshToken()) {
        // Refresh the access token if it's expired
        return authService.refreshToken(authService.getRefreshToken()!).pipe(
          switchMap((response: any) => {
            authService.saveTokens(response.access, authService.getRefreshToken()!);
            
            // Retry the original request with the new token
            const newRequest = req.clone({
              setHeaders: { Authorization: `Bearer ${response.access}` }
            });

            return next(newRequest);
          }),
          catchError(err => {
            authService.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
