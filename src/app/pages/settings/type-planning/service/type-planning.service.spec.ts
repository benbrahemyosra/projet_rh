import { TestBed } from '@angular/core/testing';

import { TypePlanningService } from './type-planning.service';

describe('TypePlanningService', () => {
  let service: TypePlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
