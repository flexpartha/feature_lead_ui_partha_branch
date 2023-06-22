import { CommonModule } from "@angular/common";
// Angular
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
// import { GestureConfig } from "@angular/material/core";
import { OverlayModule } from "@angular/cdk/overlay";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

// Perfect Scroll bar
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
// SVG inline
import { InlineSVGModule } from "ng-inline-svg";
// Components
import { AppComponent } from "./app.component";
// Modules
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { ThemeModule } from "./views/theme/theme.module";
// Partials
import { PartialsModule } from "./views/partials/partials.module";
// Layout Services
import {
  LayoutConfigService,
  // MenuConfigService,
  SplashScreenService,
} from "./core/_base/layout";

// Config
import { LayoutConfig } from "./core/_config/layout.config";
import { AuthTokenInterceptor } from "./auth-token.interceptor";
import { AuthGuard } from "./core/auth/auth.guard";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { environment } from "src/environments/environment";
import { Configuration } from "msal";
import {
  MsalAngularConfiguration,
  MsalModule,
  MsalService,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
} from "@azure/msal-angular";
// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};
const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;
export const protectedResourceMap: [string, string[]][] = [
  ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
];
export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}
function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      redirectUri: environment.redirectUri,
      postLogoutRedirectUri: environment.redirectUri,
      navigateToLoginRequestUrl: true,
      validateAuthority: false,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: isIE,
    },
  };
}
function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    consentScopes: [
      "user.read",
      "openid",
      "profile",
      "api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user",
    ],
    unprotectedResources: [],
    protectedResourceMap,
    extraQueryParameters: {},
  };
}

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule,
    PartialsModule,
    CoreModule,
    OverlayModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatProgressSpinnerModule,
    InlineSVGModule.forRoot(),
    ThemeModule,
    InfiniteScrollModule,
    AutocompleteLibModule
  ],
  exports: [],
  providers: [
    LayoutConfigService,
    // MenuConfigService,
    SplashScreenService,

    AuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory,
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory,
    },
    MsalService,
    // {
    //   provide: HAMMER_GESTURE_CONFIG,
    //   useClass: GestureConfig,
    // },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
