import { createTestingModule } from '../../../../../../testing/test-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMetric } from './card-metric';

describe('CardMetric', () => {
  let component: CardMetric;
  let fixture: ComponentFixture<CardMetric>;

  beforeEach(async () => {
    await createTestingModule([CardMetric]).compileComponents();

    fixture = TestBed.createComponent(CardMetric);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
