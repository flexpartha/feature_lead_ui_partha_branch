import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { GlobalConstants } from "src/app/views/models/global-constants";
import { UserService } from "src/app/views/services/user/user.service";
import { AuthService } from "../../../../services/auth/auth.service";
import { StorageManageService } from "../../../../services/storageservice/storage.service";
import jwt_decode from "jwt-decode";
import { utils } from "src/app/views/utils/utils";
import { UserInfo } from "src/app/views/models/user-info";
import { SplashScreenService } from "../../../../../core/_base/layout";
import * as moment from "moment";

@Component({
  selector: "kt-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  subscriptions: Subscription[] = [];
  title = "WebApp";
  isIframe = false;
  loggedIn = false;
  currentYear: number = moment().year();
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageManageService,
    private splashScreenService: SplashScreenService
  ) {}

  ngOnInit(): void {
    this.splashScreenService.hide();
    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;
    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();
    loginSuccessSubscription = this.userService
      .broadCast()
      .subscribe(GlobalConstants.msalLoginSuccess, () => {
        this.checkAccount();
      });
    loginFailureSubscription = this.userService
      .broadCast()
      .subscribe(GlobalConstants.msalLoginFailure, () => {});

    this.userService.handleRedirectCallBack();
    this.userService.setLogger();

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
    // if (this.loggedIn) {
    //   this.router.navigate(["assessment"]);
    // }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  checkAccount(): any {
    this.loggedIn = !!this.userService.getAccount();
    if (this.loggedIn) {
      let userDetails: any = jwt_decode(
        this.storageService.get("msal.idtoken")
      );
      const { first, last } = utils.splitFirstOccurrence(
        userDetails?.name,
        " "
      );
      this.storageService.set("profileName", first);
      this.authService
        .validateUser(userDetails?.email)
        .subscribe((responseBody: any) => {
          if (responseBody.status) {
            if (responseBody.result) {
              var data = responseBody.result;
              console.log("Authentication Data::--",data);
              let userInfo: UserInfo = new UserInfo();
              (userInfo.id = data.id),
                (userInfo.email = data.email),
                (userInfo.countryId = data.countryId),
                (userInfo.languageId = data.languageId);
                (userInfo.rollName = data.roleName);
              this.storageService.set("userInfo", JSON.stringify(userInfo));
              if(data.roleName === 'Assessment Requester'){
                this.router.navigate(["assessment"]);
                console.log("log assessment section-----");
              }
              if(data.roleName === 'Trainer'){
                this.router.navigate(["experts/expert-assessment"]);
                console.log("log Expert Assessment section-----")
              }
            } else {
              this.router.navigate(["register"]);
            }
          }
        }),
        (err) => {
          this.router.navigate(["register"]);
        };
    }
  }

  signIn() {
    this.userService.login();
  }

  validateUser(): any {
    let userDetails: any = jwt_decode(this.storageService.get("msal.idtoken"));
    this.authService
      .validateUser(userDetails?.email)
      .subscribe((responseBody: any) => {
        if (responseBody.status) {
          return responseBody.result;
        } else {
          return false;
        }
      }),
      (err) => {
        return false;
      };
  }
}
