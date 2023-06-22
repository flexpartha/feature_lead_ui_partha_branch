// Angular
import { Component, OnInit } from '@angular/core';
// Layout
import { HtmlClassService } from '../html-class.service';
// Object-Path
import * as moment from "moment";

@Component({
  selector: 'kt-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  footerClasses = '';
  footerContainerClasses = '';
  currentYear: number = moment().year(); 

  /**
   * Component constructor
   *
   * @param uiClasses: HtmlClassService
   */
  constructor(private uiClasses: HtmlClassService) {
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.footerClasses = this.uiClasses.getClasses('footer', true).toString();
    this.footerContainerClasses = this.uiClasses.getClasses('footer_container', true).toString();
  }
}
