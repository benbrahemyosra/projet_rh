import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePlanningComponent } from './type-planning.component';

describe('TypePlanningComponent', () => {
  let component: TypePlanningComponent;
  let fixture: ComponentFixture<TypePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
