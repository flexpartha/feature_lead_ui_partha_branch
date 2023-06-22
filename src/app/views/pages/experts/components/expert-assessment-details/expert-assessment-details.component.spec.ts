import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAssessmentDetailsComponent } from './expert-assessment-details.component';

describe('ExpertAssessmentDetailsComponent', () => {
  let component: ExpertAssessmentDetailsComponent;
  let fixture: ComponentFixture<ExpertAssessmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertAssessmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
