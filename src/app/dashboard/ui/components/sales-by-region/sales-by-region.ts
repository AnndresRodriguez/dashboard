import { Component } from '@angular/core';
import { RadarChart } from '../shared/radar-chart/radar-chart';

@Component({
  selector: 'app-sales-by-region',
  imports: [RadarChart],
  templateUrl: './sales-by-region.html',
  styleUrl: './sales-by-region.scss',
})
export class SalesByRegion {}
