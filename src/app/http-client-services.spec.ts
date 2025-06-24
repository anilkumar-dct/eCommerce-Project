import { TestBed } from '@angular/core/testing';

import { HttpClientServices } from './http-client-services';

describe('HttpClientServices', () => {
  let service: HttpClientServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
