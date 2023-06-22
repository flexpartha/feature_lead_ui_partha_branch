import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
// Layout
import { OffcanvasOptions } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';

@Component({
  selector: 'kt-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideLeftComponent implements OnInit, AfterViewInit {
  private offcanvas: any;

  @ViewChild('asideMenuOffcanvas', {static: true}) asideMenuOffcanvas: ElementRef;
  @ViewChild('asideMenu', {static: true}) asideMenu: ElementRef;

  asideClasses = '';
  currentRouteUrl = '';
  insideTm: any;
  outsideTm: any;
  sideBarMenu = [];
  menuCanvasOptions: OffcanvasOptions = {
    baseClass: 'aside',
    overlay: true,
    closeBy: 'kt_aside_close_btn',
    toggleBy: {
      target: 'kt_aside_mobile_toggle',
      state: 'mobile-toggle-active'
    }
  };


  /**
   * Component Constructor
   *
   * param htmlClassService: HtmlClassService
   * param layoutConfigService: LayoutConfigService
   * param router: Router
   * param render: Renderer2
   * param cdr: ChangeDetectorRef
   */
  constructor(
    public htmlClassService: HtmlClassService,
    private router: Router,
    private render: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {    
  }

  ngOnInit() {
    this.currentRouteUrl = this.router.url?.split(/[?#]/)[0];
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRouteUrl = this.router.url?.split(/[?#]/)[0];
        this.mobileMenuClose();
        this.cdr.markForCheck();
      });
    this.asideClasses = this.htmlClassService.getClasses('aside', true).toString();
    // this.asideLogo = this.getAsideLogo();    
    setTimeout(() => {
      this.offcanvas = new KTOffcanvas(this.asideMenuOffcanvas.nativeElement, this.menuCanvasOptions);
    });

    if (
      this.currentRouteUrl === "/assessment" ||
      this.currentRouteUrl === "/assessment/completed"
    ){
      this.sideBarMenu = [
        {
          title: 'My Assessment',
          root: true,
          icon: 'far fa-file-alt',
          page: '/assessment',
          translate: 'MENU.MY_ASSESSMENT',
          bullet: 'dot',
        },
        // {
        //   title: 'Experts',
        //   root: true,
        //   icon: 'fas fa-user-friends',
        //   page: '/experts',
        //   translate: 'MENU.EXPERTS',
        //   bullet: 'dot',
        // },
      ]
    }
    if (
      this.currentRouteUrl === "/experts/expert-assessment" ||
      this.currentRouteUrl === "/experts/completed"
    ){
      this.sideBarMenu = [
        {
          title: 'My Assessment',
          root: true,
          icon: 'far fa-file-alt',
          page: '/experts/expert-assessment',
          translate: 'MENU.MY_ASSESSMENT',
          bullet: 'dot',
        },
        // {
        //   title: 'Experts',
        //   root: true,
        //   icon: 'fas fa-user-friends',
        //   page: '/experts',
        //   translate: 'MENU.EXPERTS',
        //   bullet: 'dot',
        // },
      ]
    }
    if (
      this.currentRouteUrl === "/experts/expertassessmentdetail"
    ){
      this.sideBarMenu = [
        {
          title: 'My Assessment',
          root: true,
          icon: 'far fa-file-alt',
          page: '/experts/expert-assessment',
          translate: 'MENU.MY_ASSESSMENT',
          bullet: 'dot',
        },
        // {
        //   title: 'Experts',
        //   root: true,
        //   icon: 'fas fa-user-friends',
        //   page: '/experts',
        //   translate: 'MENU.EXPERTS',
        //   bullet: 'dot',
        // },
      ]
    }
  }

  /**
   * Check Menu is active
   * @param item: any
   */
  isMenuItemIsActive(item): boolean {
    return this.currentRouteUrl.indexOf(item.page) !== -1;
  }

  /**
   * Use for fixed left aside menu, to show menu on mouseenter event.
   * @param e Event
   */
  mouseEnter(e: Event) {
    // check if the left aside menu is fixed
    if (document.body.classList.contains('aside-fixed')) {
      if (this.outsideTm) {
        clearTimeout(this.outsideTm);
        this.outsideTm = null;
      }

      this.insideTm = setTimeout(() => {
        // if the left aside menu is minimized
        if (document.body.classList.contains('aside-minimize') && KTUtil.isInResponsiveRange('desktop')) {
          // show the left aside menu
          this.render.removeClass(document.body, 'aside-minimize');
          this.render.addClass(document.body, 'aside-minimize-hover');
        }
      }, 50);
    }
  }

  /**
   * Use for fixed left aside menu, to show menu on mouseenter event.
   * @param e Event
   */
  mouseLeave(e: Event) {
    if (document.body.classList.contains('aside-fixed')) {
      if (this.insideTm) {
        clearTimeout(this.insideTm);
        this.insideTm = null;
      }

      this.outsideTm = setTimeout(() => {
        // if the left aside menu is expand
        if (document.body.classList.contains('aside-minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
          // hide back the left aside menu
          this.render.removeClass(document.body, 'aside-minimize-hover');
          this.render.addClass(document.body, 'aside-minimize');
        }
      }, 100);
    }
  }

  /**
   * Returns Submenu CSS Class Name
   * @param item: any
   */
  getItemCssClasses(item) {
    let classes = 'menu-item';
    if (!item.submenu && this.isMenuItemIsActive(item)) {
      classes += ' menu-item-active menu-item-here';
    }
    return classes;
  }

  mobileMenuClose() {
    if (KTUtil.isBreakpointDown('lg') && this.offcanvas) { // Tablet and mobile mode
      this.offcanvas.hide(); // Hide offcanvas after general link click
    }
  }
}
