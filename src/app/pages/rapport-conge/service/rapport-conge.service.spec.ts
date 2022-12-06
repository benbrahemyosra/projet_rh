import { TestBed } from '@angular/core/testing';

import { RapportCongeService } from './rapport-conge.service';

describe('RapportCongeService', () => {
  let service: RapportCongeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportCongeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
