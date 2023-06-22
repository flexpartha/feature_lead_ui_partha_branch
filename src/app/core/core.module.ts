// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OffcanvasDirective,
  ScrollTopDirective,
  StickyDirective,
  ToggleDirective
} from './_base/layout';

@NgModule({
  imports: [CommonModule],
  declarations: [
    // directives
    ScrollTopDirective,
    OffcanvasDirective,
    ToggleDirective,
    StickyDirective,
  ],
  exports: [
    // directives
    ScrollTopDirective,
    OffcanvasDirective,
    ToggleDirective,
    StickyDirective,
  ],
  providers: []
})
export class CoreModule {
}
