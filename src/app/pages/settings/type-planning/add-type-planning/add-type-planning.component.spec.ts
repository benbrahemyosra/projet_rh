import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypePlanningComponent } from './add-type-planning.component';

describe('AddTypePlanningComponent', () => {
  let component: AddTypePlanningComponent;
  let fixture: ComponentFixture<AddTypePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypePlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
