import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAssessmentComponent } from './expert-assessment.component';

describe('ExpertAssessmentComponent', () => {
  let component: ExpertAssessmentComponent;
  let fixture: ComponentFixture<ExpertAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
