import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSetupComponent } from './form-setup.component';

describe('FormSetupComponent', () => {
  let component: FormSetupComponent;
  let fixture: ComponentFixture<FormSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
