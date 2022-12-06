import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportCongeComponent } from './rapport-conge.component';

describe('RapportCongeComponent', () => {
  let component: RapportCongeComponent;
  let fixture: ComponentFixture<RapportCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
