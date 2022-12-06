import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamSocieteComponent } from './param-societe.component';

describe('ParamSocieteComponent', () => {
  let component: ParamSocieteComponent;
  let fixture: ComponentFixture<ParamSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamSocieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
