import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExpertsRoutingModule } from './experts-routing.module';
import { ExpertsComponent } from './components/experts/experts.component';
import { ExpertViewComponent } from './components/expert-view/expert-view.component';
import { ExpertAssessmentComponent } from './components/expert-assessment/expert-assessment.component';
import { TranslateModule } from "@ngx-translate/core";
import { CompletedAssessmentComponent } from './components/completed-assessment/completed-assessment.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpertAssessmentDetailsComponent } from './components/expert-assessment-details/expert-assessment-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ServertypeInfoComponent } from './components/servertype-info/servertype-info.component';
import { ActiveAssessmentComponent } from './components/active-assessment/active-assessment.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { PreRequisiteComponent } from './components/pre-requisite/pre-requisite.component';
import { PreAssessmentComponent } from './components/pre-assessment/pre-assessment.component';
import { SpecialPipePipe } from './components/pipe/special-pipe.pipe';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DeclinedAssessmentComponent } from './components/declined-assessment/declined-assessment.component';


@NgModule({
  declarations: [ExpertsComponent, ExpertViewComponent, ExpertAssessmentComponent, CompletedAssessmentComponent, ExpertAssessmentDetailsComponent, ServertypeInfoComponent, ActiveAssessmentComponent, ActivitiesComponent, PreRequisiteComponent, PreAssessmentComponent, SpecialPipePipe, AppointmentComponent, DeclinedAssessmentComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatTabsModule,
    MatProgressSpinnerModule,
    NgbModule,
    ExpertsRoutingModule,
    InfiniteScrollModule,
    InlineSVGModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class ExpertsModule { }
