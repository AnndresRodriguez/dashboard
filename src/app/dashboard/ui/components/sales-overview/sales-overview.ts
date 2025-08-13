import { AfterViewInit, Component, inject } from '@angular/core';
import { LineChart } from '../shared/line-chart/line-chart';
import { SalesOverviewStore } from '../../../application/store/sales-overview.store';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-sales-overview',
  imports: [LineChart, DecimalPipe],
  templateUrl: './sales-overview.html',
  styleUrl: './sales-overview.scss',
})
export class SalesOverview implements AfterViewInit {
  // Inyectar el store
  protected readonly store = inject(SalesOverviewStore);

  ngAfterViewInit(): void {
    // Cargar datos usando el store
    this.store.loadSalesOverview();
  }
}
