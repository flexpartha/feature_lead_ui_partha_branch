import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRequisiteComponent } from './pre-requisite.component';

describe('PreRequisiteComponent', () => {
  let component: PreRequisiteComponent;
  let fixture: ComponentFixture<PreRequisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRequisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRequisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
