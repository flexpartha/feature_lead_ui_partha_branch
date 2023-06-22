// Angular
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  Input,
  ViewChild,
} from "@angular/core";
import { NavigationEnd, Router} from "@angular/router";
// RxJS
import { filter } from "rxjs/operators";
// Object-Path
// Layout
import {
  OffcanvasOptions,
} from "../../../../core/_base/layout";
// HTML Class
import { HtmlClassService } from "../../html-class.service";

@Component({
  selector: "kt-menu-horizontal",
  templateUrl: "./menu-horizontal.component.html",
  styleUrls: ["./menu-horizontal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHorizontalComponent implements OnInit, AfterViewInit {
  private offcanvas: any;
  @ViewChild("headerMenuOffcanvas", { static: true })
  headerMenuOffcanvas: ElementRef;

  @Input() headerMenuSelfDisplay: boolean;
  @Input() headerMenuClasses: string;
  // Public properties
  currentRouteUrl: any = "";
  asideSelfDisplay = "";
  showMenuHeader: boolean = true;

  offcanvasOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: "header-menu-wrapper",
    closeBy: "kt_header_menu_mobile_close_btn",
    toggleBy: {
      target: "kt_header_mobile_toggle",
      state: "mobile-toggle-active",
    },
  };
  headerMenu: any;

  /**
   * Component Conctructor
   *
   * @param htmlClassService: HtmlClassService
   * @param router: Router
   * @param cdr: ChangeDetectorRef
   */
  constructor(
    public htmlClassService: HtmlClassService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * After view init
   */
  ngAfterViewInit(): void {}

  /**
   * On init
   */
  ngOnInit(): void {
    // this.headerMenu = [
    //   {
    //     title: 'Active Assessment',
    //     root: true,
    //     alignment: 'left',
    //     page: '/assessment',
    //     translate: 'MENU.ACTIVE_ASSESSMENT',
    //   },
    //   {
    //     title: 'Completed Assessment',
    //     root: true,
    //     alignment: 'left',
    //     page: '/assessment/completed',
    //     translate: 'MENU.COMPLETED_ASSESSMENT',
    //   },
    //   // {
    //   //   title: 'Active Assessment',
    //   //   root: true,
    //   //   alignment: 'left',
    //   //   page: '/experts/expert-assessment',
    //   //   translate: 'MENU.ACTIVE_ASSESSMENT',
    //   // },
    //   // {
    //   //   title: 'Completed Assessment',
    //   //   root: true,
    //   //   alignment: 'left',
    //   //   page: '/experts/expert-assessment/completed',
    //   //   translate: 'MENU.COMPLETED_ASSESSMENT',
    //   // }
    // ]
    this.currentRouteUrl = this.router.url;
    if (
      this.currentRouteUrl === "/assessment" ||
      this.currentRouteUrl === "/assessment/completed"
    ) {
      this.showMenuHeader = true;
      this.headerMenu = [
        {
          title: 'Active',
          root: true,
          alignment: 'left',
          page: '/assessment',
          translate: 'MENU.ACTIVE_ASSESSMENT',
        },
        {
          title: 'Completed',
          root: true,
          alignment: 'left',
          page: '/assessment/completed',
          translate: 'MENU.COMPLETED_ASSESSMENT',
        }
      ]
    } else if(
      this.currentRouteUrl === "/experts/expert-assessment" ||
      this.currentRouteUrl === "/experts/completed" ||
      this.currentRouteUrl === "/experts/declined"
    ){
      this.showMenuHeader = true;
      this.headerMenu = [
        {
          title: 'Active',
          root: true,
          alignment: 'left',
          page: '/experts/expert-assessment',
          translate: 'MENU.ACTIVE_ASSESSMENT',
        },
        {
          title: 'Completed',
          root: true,
          alignment: 'left',
          page: '/experts/completed',
          translate: 'MENU.COMPLETED_ASSESSMENT',
        },
        {
          title: 'Declined',
          root: true,
          alignment: 'left',
          page: '/experts/declined',
          translate: 'MENU.DECLINED_ASSESSMENT',
        }
      ]
    }
    else {
      this.showMenuHeader = false;
    }
    this.cdr.markForCheck();
    setTimeout(() => {
      this.offcanvas = new KTOffcanvas(
        this.headerMenuOffcanvas.nativeElement,
        this.offcanvasOptions
      );
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRouteUrl = this.router.url;
        this.mobileMenuClose();
        if (
          this.currentRouteUrl === "/assessment" ||
          this.currentRouteUrl === "/assessment/completed"
        ) {
          this.showMenuHeader = true;
        } else if(
          this.currentRouteUrl === "/experts/expert-assessment" ||
          this.currentRouteUrl === "/experts/completed" ||
          this.currentRouteUrl === "/experts/declined"
        ){
          this.showMenuHeader = true;
        }
        else {
          this.showMenuHeader = false;
        }
        this.cdr.markForCheck();
      });
  }

  /**
   * Return Css Class Name
   * @param item: any
   */

  getActiveMenu(item) {
    return this.router.url === item.page ? true : false;
  }
  getItemCssClasses(item) {
    let classes = "menu-item";
    if (this.getActiveMenu(item)) {
      classes += " menu-item-active menu-item-here";
    }
    classes += " menu-item-rel";
    return classes;
  }

  /**
   * Check Menu is active
   * @param item: any
   */
  isMenuItemIsActive(item): boolean {
    if (!item.page) {
      return false;
    }
    return this.currentRouteUrl.indexOf(item.page) !== -1;
  }

  mobileMenuClose() {
    if (KTUtil.isBreakpointDown("lg") && this.offcanvas) {
      // Tablet and mobile mode
      this.offcanvas.hide(); // Hide offcanvas after general link click
    }
  }
}
