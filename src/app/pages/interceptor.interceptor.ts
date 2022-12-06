import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (window.location.pathname !== '/login') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            console.log('err');
            this.router.navigateByUrl('/login') ;
            
          //   localStorage.clear();
          //   this.router.navigate(['/login']);
          //   this.loader.isLoading = false;
          //   this.tablerService.isLoading = false;
          //   return throwError(error);
          // case 403:
          //   const refToken = localStorage.getItem('Refresh_token');
          //   const data = {
          //     refresh_token: refToken,
          //   };

            // this.loginService.refreshToken(data).subscribe((res: any) => {
            //   if (res.success) {
            //     localStorage.setItem('token', res.data.token);
            //     localStorage.setItem('Refresh_token', res.data.refresh_token);
            //     request = request.clone({
            //       setHeaders: {
            //         Authorization: `Bearer ${res.data.token}`,
            //       },
            //     });
            //     location.reload();
            //   } else {
            //     this.router.navigate(['/login']);
            //     this.tablerService.isLoading = false;
            //     this.loader.isLoading = false;
            //   }
            // });

            return throwError(error);
          default:
            return throwError(error);
        }
      })
    );
  }
}
