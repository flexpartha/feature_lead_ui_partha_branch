import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedAssessmentComponent } from './completed-assessment.component';

describe('CompletedAssessmentComponent', () => {
  let component: CompletedAssessmentComponent;
  let fixture: ComponentFixture<CompletedAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
