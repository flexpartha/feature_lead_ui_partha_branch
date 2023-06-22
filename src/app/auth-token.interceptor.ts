import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";

import { throwError, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { StorageManageService } from "./views/services/storageservice/storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageManageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.storageService.get("msal.idtoken");
    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token),
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        }
        return throwError(err);
      })
    );
  }
}
