import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyAssessmentRoutingModule } from "./my-assessment-routing.module";
import { ActiveAssessmentComponent } from "./components/active-assessment/active-assessment.component";
import { CompletedAssessmentComponent } from "./components/completed-assessment/completed-assessment.component";
import { TranslateModule } from "@ngx-translate/core";
import { AssessmentDetailsComponent } from "./components/assessment-details/assessment-details.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MatTabsModule } from "@angular/material/tabs";
import { NewAssessmentComponent } from './components/new-assessment/new-assessment.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormWizardComponent } from './components/form-wizard/form-wizard.component';
import { FormSetupComponent } from './components/form-setup/form-setup.component';
import { FormPreAssesmentComponent } from './components/form-pre-assesment/form-pre-assesment.component';
import { FormBookAssesmentComponent } from './components/form-book-assesment/form-book-assesment.component';
import { FormPreRequisiteComponent } from './components/form-pre-requisite/form-pre-requisite.component';
import { InfoTileComponent } from './components/info-tile/info-tile.component';

@NgModule({
  declarations: [
    ActiveAssessmentComponent,
    CompletedAssessmentComponent,
    AssessmentDetailsComponent,
    NewAssessmentComponent,
    FormWizardComponent,
    FormSetupComponent,
    FormPreAssesmentComponent,
    FormBookAssesmentComponent,
    FormPreRequisiteComponent,
    InfoTileComponent,
  ],
  imports: [
    CommonModule,
    MyAssessmentRoutingModule,
    TranslateModule.forChild(),
    MatTabsModule,
    MatProgressSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MyAssessmentModule {}
