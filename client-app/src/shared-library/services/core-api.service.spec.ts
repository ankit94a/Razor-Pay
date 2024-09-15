import { TestBed } from '@angular/core/testing';

import { CoreAPIService } from './core-api.service';

describe('CoreAPIService', () => {
  let service: CoreAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
