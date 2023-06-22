// import { NgxPermissionsModule } from 'ngx-permissions';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// NgBootstrap
import { NgbProgressbarModule, NgbTooltipModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// Translation
import { TranslateModule } from '@ngx-translate/core';
// Loading bar
import { LoadingBarModule } from '@ngx-loading-bar/core';
// Ngx DatePicker
// Perfect Scrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
// Core Module
import { CoreModule } from '../../core/core.module';
import { HeaderComponent } from './header/header.component';
import { AsideLeftComponent } from './aside/aside-left.component';
import { FooterComponent } from './footer/footer.component';
import { BrandComponent } from './brand/brand.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { MenuHorizontalComponent } from './header/menu-horizontal/menu-horizontal.component';
import { PartialsModule } from '../partials/partials.module';
import { BaseComponent } from './base/base.component';
import { PagesModule } from '../pages/pages.module';
import { HtmlClassService } from './html-class.service';
import { HeaderMobileComponent } from './header/header-mobile/header-mobile.component';
// import { PermissionEffects, permissionsReducer, RoleEffects, rolesReducer } from '../../core/auth';

@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,

    // headers
    HeaderComponent,
    BrandComponent,
    HeaderMobileComponent,

    // topbar components
    TopbarComponent,

    // aside left menu components
    AsideLeftComponent,

    // horizontal menu components
    MenuHorizontalComponent,
  ],
  exports: [
    BaseComponent,
    FooterComponent,

    // headers
    HeaderComponent,
    BrandComponent,
    HeaderMobileComponent,

    // topbar components
    TopbarComponent,

    // aside left menu components
    AsideLeftComponent,

    // horizontal menu components
    MenuHorizontalComponent,
  ],
  providers: [
    HtmlClassService,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesModule,
    PartialsModule,
    CoreModule,
    PerfectScrollbarModule,
    FormsModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule.forChild(),
    LoadingBarModule,
    InlineSVGModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbDropdownModule
  ]
})
export class ThemeModule {
}