import { TestBed } from '@angular/core/testing';

import { RouteExtensionService } from './route-extension.service';

describe('RouteExtensionService', () => {
  let service: RouteExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
