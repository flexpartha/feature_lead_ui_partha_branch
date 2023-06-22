import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreRequisiteComponent } from './form-pre-requisite.component';

describe('FormPreRequisiteComponent', () => {
  let component: FormPreRequisiteComponent;
  let fixture: ComponentFixture<FormPreRequisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPreRequisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreRequisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
