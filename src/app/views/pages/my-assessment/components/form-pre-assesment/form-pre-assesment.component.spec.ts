import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreAssesmentComponent } from './form-pre-assesment.component';

describe('FormPreAssesmentComponent', () => {
  let component: FormPreAssesmentComponent;
  let fixture: ComponentFixture<FormPreAssesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPreAssesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
