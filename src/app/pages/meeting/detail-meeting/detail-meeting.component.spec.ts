import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMeetingComponent } from './detail-meeting.component';

describe('DetailMeetingComponent', () => {
  let component: DetailMeetingComponent;
  let fixture: ComponentFixture<DetailMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
