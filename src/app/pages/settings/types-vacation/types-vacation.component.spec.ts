import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesVacationComponent } from './types-vacation.component';

describe('TypesVacationComponent', () => {
  let component: TypesVacationComponent;
  let fixture: ComponentFixture<TypesVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesVacationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
