import { Injectable } from "@angular/core";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { CryptoUtils, Logger } from "msal";
@Injectable({
  providedIn: "root",
  useClass: UserService,
})
export class UserService {
  constructor(
    private authService: MsalService,
    private broadcastService: BroadcastService
  ) {}

  login(): any {
    return this.authService.loginRedirect();
  }
  logout(): any {
    return this.authService.logout();
  }
  getAccount(): any {
    return this.authService.getAccount();
  }
  handleRedirectCallBack(): any {
    return this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        return;
      }
    });
  }
  setLogger(): any {
    return this.authService.setLogger(
      new Logger((logLevel, message, piiEnabled) => {}, {
        correlationId: CryptoUtils.createNewGuid(),
        piiLoggingEnabled: false,
      })
    );
  }
  broadCast(): any {
    return this.broadcastService;
  }
}
