import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
  },
  {
    path: "register",
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [LandingPageComponent, RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
})
export class HomeModule {}
