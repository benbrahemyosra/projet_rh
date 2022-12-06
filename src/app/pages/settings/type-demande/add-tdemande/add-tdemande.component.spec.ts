import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTdemandeComponent } from './add-tdemande.component';

describe('AddTdemandeComponent', () => {
  let component: AddTdemandeComponent;
  let fixture: ComponentFixture<AddTdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTdemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
