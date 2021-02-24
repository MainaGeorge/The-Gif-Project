import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2/src/sweetalert2.js'


@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe( catchError( (responseError: HttpErrorResponse) => {
      if(responseError.status === 401){
        this.toastr.success("unauthorized");
        Swal.fire('oops', "error", 'error');
      }
      if(responseError.status === 400){
        const modelErrors = responseError.error["modelErrors"];
        modelErrors.forEach(c => {
          this.toastr.error(c);
        })
      }
      return throwError(responseError);
    }));
  }

}

export const GlobalErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
