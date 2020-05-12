import { TestBed } from '@angular/core/testing';

import { OpenViewerService } from './open-viewer.service';

describe('OpenViewerService', () => {
  let service: OpenViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
