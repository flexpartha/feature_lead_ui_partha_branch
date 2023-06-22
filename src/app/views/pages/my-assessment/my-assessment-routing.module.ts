import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveAssessmentComponent } from './components/active-assessment/active-assessment.component';
import { CompletedAssessmentComponent } from './components/completed-assessment/completed-assessment.component';
import { FormWizardComponent } from './components/form-wizard/form-wizard.component';
import { AssessmentDetailsComponent } from './components/assessment-details/assessment-details.component'
const routes: Routes = [
  {
    path: '',
    component: ActiveAssessmentComponent
  },
  {
    path: 'completed',
    component: CompletedAssessmentComponent
  },
  {
    path: "create",
    component: FormWizardComponent,
  },
  {
    path: 'update/:serviceTypeId/:assessmentId',
    component: FormWizardComponent
  },
  {
    path: 'detail',
    component: AssessmentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAssessmentRoutingModule { }
