import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGurardGuard } from './auth-gurard';

describe('authGurardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGurardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
