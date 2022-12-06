import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMenusComponent } from './detail-menus.component';

describe('DetailMenusComponent', () => {
  let component: DetailMenusComponent;
  let fixture: ComponentFixture<DetailMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
