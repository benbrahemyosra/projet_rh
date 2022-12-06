import { TestBed } from '@angular/core/testing';

import { ParamSocieteService } from './param-societe.service';

describe('ParamSocieteService', () => {
  let service: ParamSocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamSocieteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
