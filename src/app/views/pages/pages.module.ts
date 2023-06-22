// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    PartialsModule,
  ],
  providers: []
})
export class PagesModule {
}