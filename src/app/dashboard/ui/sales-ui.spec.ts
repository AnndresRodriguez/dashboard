import { createTestingModule } from '../../../testing/test-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUi } from './sales-ui';

describe('SalesUi', () => {
  let component: SalesUi;
  let fixture: ComponentFixture<SalesUi>;

  beforeEach(async () => {
    await createTestingModule([SalesUi]).compileComponents();

    fixture = TestBed.createComponent(SalesUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
