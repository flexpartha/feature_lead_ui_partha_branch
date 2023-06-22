// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Layout
import { LayoutConfigService } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../core/_config/layout.config';

@Component({
  selector: 'kt-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit {
  contentClasses = '';
  contentContainerClasses = '';
  // Private properties
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private layoutConfigService: LayoutConfigService,
    private htmlClassService: HtmlClassService,
    ) {

    // register configs by demos
    this.layoutConfigService.loadConfigs(new LayoutConfig().configs);

    // setup element classes
    this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

    const subscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
      // reset body class based on global and page level layout config, refer to html-class.service.ts
      document.body.className = '';
      this.htmlClassService.setConfig(layoutConfig);
    });
    this.unsubscribe.push(subscription);
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.contentClasses = this.htmlClassService.getClasses('content', true).toString();
    this.contentContainerClasses = this.htmlClassService.getClasses('content_container', true).toString();
  }

}
