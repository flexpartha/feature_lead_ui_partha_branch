import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletedAssessmentComponent } from './components/completed-assessment/completed-assessment.component';
import { DeclinedAssessmentComponent } from './components/declined-assessment/declined-assessment.component';
import { ExpertAssessmentDetailsComponent } from './components/expert-assessment-details/expert-assessment-details.component';
import { ExpertAssessmentComponent } from './components/expert-assessment/expert-assessment.component';
import { ExpertViewComponent } from './components/expert-view/expert-view.component'
import { ExpertsComponent } from './components/experts/experts.component'

const routes: Routes = [
  {
    path: '',
    component: ExpertsComponent
  },
  {
    path: 'expert-assessment',
    component:ExpertAssessmentComponent
  },
  {
    path: 'completed',
    component: CompletedAssessmentComponent
  },
  {
    path: 'declined',
    component: DeclinedAssessmentComponent
  },
  {
    path: 'expertassessmentdetail/:assessmentId',
    component:ExpertAssessmentDetailsComponent
  },
  {
    path: ':id',
    component: ExpertViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule { }
