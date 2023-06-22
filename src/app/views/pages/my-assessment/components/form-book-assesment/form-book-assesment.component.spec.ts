import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBookAssesmentComponent } from './form-book-assesment.component';

describe('FormBookAssesmentComponent', () => {
  let component: FormBookAssesmentComponent;
  let fixture: ComponentFixture<FormBookAssesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBookAssesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBookAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
