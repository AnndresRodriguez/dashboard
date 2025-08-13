import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListIntegration } from './list-integration';
import { createTestingModule } from '../../../../../testing/test-utils';

describe('ListIntegration', () => {
  let component: ListIntegration;
  let fixture: ComponentFixture<ListIntegration>;

  beforeEach(async () => {
    await createTestingModule([ListIntegration])
      .compileComponents();

    fixture = TestBed.createComponent(ListIntegration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
