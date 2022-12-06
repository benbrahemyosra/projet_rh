import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOptionsComponent } from './detail-options.component';

describe('DetailOptionsComponent', () => {
  let component: DetailOptionsComponent;
  let fixture: ComponentFixture<DetailOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
