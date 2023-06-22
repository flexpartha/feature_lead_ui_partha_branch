import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAssessmentComponent } from './active-assessment.component';

describe('ActiveAssessmentComponent', () => {
  let component: ActiveAssessmentComponent;
  let fixture: ComponentFixture<ActiveAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
