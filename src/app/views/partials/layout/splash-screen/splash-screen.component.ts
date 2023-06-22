// Angular
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Layout
import { SplashScreenService } from '../../../../core/_base/layout';

@Component({
  selector: 'kt-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  // Public properties
  loaderType: string;
  @ViewChild('splashScreen', {static: true}) splashScreen: ElementRef;

  /**
   * Component constructor
   *
   * @param el: ElementRef
   * @param layoutConfigService: LayoutConfigService
   * @param splashScreenService: SplashScreenService
   */
  constructor(
    private el: ElementRef,
    private splashScreenService: SplashScreenService) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.splashScreenService.init(this.splashScreen);
  }
}
