import { AfterViewInit, Component, inject } from '@angular/core';
import { DonutChart } from '../shared/donut-chart/donut-chart';
import { DecimalPipe } from '@angular/common';
import { RegisteredUsersStore } from '../../../application/store/registered-users.store';

@Component({
  selector: 'app-registered-users',
  imports: [DonutChart, DecimalPipe],
  templateUrl: './registered-users.html',
  styleUrl: './registered-users.scss',
})
export class RegisteredUsers implements AfterViewInit {
  protected readonly store = inject(RegisteredUsersStore);

  ngAfterViewInit(): void {
    this.store.loadRegisteredUsers();
  }
}
