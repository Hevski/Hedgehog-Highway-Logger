import { TestBed } from '@angular/core/testing';

import { HighwayService } from './highway.service';

describe('HighwayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HighwayService = TestBed.get(HighwayService);
    expect(service).toBeTruthy();
  });
});
