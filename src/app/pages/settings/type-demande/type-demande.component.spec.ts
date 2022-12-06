import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemandeComponent } from './type-demande.component';

describe('TypeDemandeComponent', () => {
  let component: TypeDemandeComponent;
  let fixture: ComponentFixture<TypeDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
