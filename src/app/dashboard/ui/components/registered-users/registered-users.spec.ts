import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredUsers } from './registered-users';
import { createTestingModule } from '../../../../../testing/test-utils';

describe('RegisteredUsers', () => {
  let component: RegisteredUsers;
  let fixture: ComponentFixture<RegisteredUsers>;

  beforeEach(async () => {
    await createTestingModule([RegisteredUsers]).compileComponents();

    fixture = TestBed.createComponent(RegisteredUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
