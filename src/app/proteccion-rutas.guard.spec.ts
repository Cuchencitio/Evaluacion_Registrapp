import { TestBed } from '@angular/core/testing';

import { ProteccionRutasGuard } from './proteccion-rutas.guard';

describe('ProteccionRutasGuard', () => {
  let guard: ProteccionRutasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProteccionRutasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
