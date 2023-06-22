import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServertypeInfoComponent } from './servertype-info.component';

describe('ServertypeInfoComponent', () => {
  let component: ServertypeInfoComponent;
  let fixture: ComponentFixture<ServertypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServertypeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServertypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
