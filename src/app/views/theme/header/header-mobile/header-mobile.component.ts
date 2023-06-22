// Angular
import { Component, OnInit } from "@angular/core";
// Layout
import { HtmlClassService } from "../../html-class.service";
import { UserService } from "../../../services/user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "kt-header-mobile",
  templateUrl: "./header-mobile.component.html",
  styleUrls: ["./header-mobile.component.scss"],
})
export class HeaderMobileComponent implements OnInit {
  headerMobileClasses = "";
  currentRouteUrl;

  constructor(
    private uiService: HtmlClassService,
    private userService: UserService,
    private router: Router,

  ) {}
  /**
   * On init
   */
  ngOnInit() {
    this.currentRouteUrl = this.router.url;

    this.headerMobileClasses = this.uiService
      .getClasses("header_mobile", true)
      .toString();
  }
  logout() {
    this.userService.logout();
  }
}
