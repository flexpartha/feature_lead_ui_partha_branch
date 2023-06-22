import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { from, Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  totalRequests = 0;
  cachedRequest: Promise<any>;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.addBearerToken(req, next));
  }
  private async addBearerToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const token = localStorage.getItem("tokenId");
    req = req.clone({
      setHeaders: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = next.handle(req).toPromise();
    result.then((res) => {});
    return result.catch(async (err) => {
      var errorData = err;
      if (errorData.status == 401) {
        // alert("Seesion timed out.Please login again!");
        // window.location.href = environment.b2cSignOutUrl + environment.urlBase + "/Session/SignOut";
      }
      throw err;
    });
  }
}
