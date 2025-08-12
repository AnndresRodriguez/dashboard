import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { DonutChart } from '../shared/donut-chart/donut-chart';
import { GetRegisteredUsersUseCase } from '../../../application/use-case/get-registered-users.usecase';
import { Users } from '../../../domain/models/registered-users';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-registered-users',
  imports: [DonutChart, DecimalPipe],
  templateUrl: './registered-users.html',
  styleUrl: './registered-users.scss',
})
export class RegisteredUsers implements AfterViewInit {
  private readonly getRegisteredUsersUseCase = inject(
    GetRegisteredUsersUseCase,
  );

  protected readonly registeredUsers = signal<Users>(new Users(0, 0, 0));

  ngAfterViewInit(): void {
    this.getRegisteredUsersUseCase.execute().subscribe({
      next: (data) => this.registeredUsers.set(data),
      error: (error) => {
        console.error('Error fetching registered users:', error);
      },
    });
  }
}
