import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChefComponent } from './detail-chef.component';

describe('DetailChefComponent', () => {
  let component: DetailChefComponent;
  let fixture: ComponentFixture<DetailChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailChefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
