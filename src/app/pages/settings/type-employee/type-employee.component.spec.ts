import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEmployeeComponent } from './type-employee.component';

describe('TypeEmployeeComponent', () => {
  let component: TypeEmployeeComponent;
  let fixture: ComponentFixture<TypeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
