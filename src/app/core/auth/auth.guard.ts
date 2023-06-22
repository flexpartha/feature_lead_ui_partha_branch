import { Injectable, Inject } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { MsalService } from "@azure/msal-angular";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(MsalService) private authService: MsalService,
    @Inject(Router) private router: Router
  ) {}

  /**
   * Can this route be activated?
   * @param {ActivatedRouteSnapshot} route - The route.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const loggedIn = !!this.authService.getAccount();
    if (loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Can this child route be activated?
   * @param {ActivatedRouteSnapshot} route - The route.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
  public async canActivateChild(
    route: ActivatedRouteSnapshot
  ): Promise<boolean> {
    const loggedIn = !!this.authService.getAccount();
    if (loggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
