import { Component } from '@angular/core';
import { DonutChart } from '../shared/donut-chart/donut-chart';

@Component({
  selector: 'app-registered-users',
  imports: [DonutChart],
  templateUrl: './registered-users.html',
  styleUrl: './registered-users.scss',
})
export class RegisteredUsers {}
