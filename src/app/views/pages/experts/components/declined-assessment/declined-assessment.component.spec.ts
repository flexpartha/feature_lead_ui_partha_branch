import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedAssessmentComponent } from './declined-assessment.component';

describe('DeclinedAssessmentComponent', () => {
  let component: DeclinedAssessmentComponent;
  let fixture: ComponentFixture<DeclinedAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
