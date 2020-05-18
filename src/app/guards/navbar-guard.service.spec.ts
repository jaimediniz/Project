import { TestBed } from '@angular/core/testing';

import { NavbarGuardService } from './navbar-guard.service';

describe('NavbarGuardService', () => {
  let service: NavbarGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
