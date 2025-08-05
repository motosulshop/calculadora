import { TestBed } from '@angular/core/testing';

import { ApileedService } from './apileed.service';

describe('ApileedService', () => {
  let service: ApileedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApileedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
