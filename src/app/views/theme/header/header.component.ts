// Angular
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router';
// Loading bar
import { LoadingBarService } from '@ngx-loading-bar/core';
// Layout
import { LayoutConfigService } from '../../../core/_base/layout';
// HTML Class Service
import { HtmlClassService } from '../html-class.service';


@Component({
  selector: 'kt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Public properties
  headerClasses = '';
  headerContainerClasses = '';
  headerMenuClasses = '';
  headerAttributes = {};
  headerMenuSelfDisplay = true;

  @ViewChild('ktHeader', {static: true}) ktHeader: ElementRef;

  /**
   * Component constructor
   *
   * @param router: Router
   * @param layoutConfigService: LayoutConfigService
   * @param loader: LoadingBarService
   * @param htmlClassService: HtmlClassService
   */
  constructor(
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    public loader: LoadingBarService,
    public htmlClassService: HtmlClassService
  ) {
    // page progress bar percentage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // set page progress bar loading to start on NavigationStart event router
        this.loader.start();
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loader.increment(35);
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loader.increment(75);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // set page progress bar loading to end on NavigationEnd event router
        this.loader.complete();
      }
    });
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.headerClasses = this.htmlClassService.getClasses('header', true).toString();
    this.headerAttributes = this.htmlClassService.getAttributes('header');
    this.headerMenuSelfDisplay = this.layoutConfigService.getConfig('header.menu.self.display');
    this.headerContainerClasses = this.htmlClassService.getClasses('header_container', true).toString();
    this.headerMenuClasses = this.htmlClassService.getClasses('header_menu', true).toString();
  }

}
