import { AfterViewInit, Component, inject } from '@angular/core';
import { RadarChart } from '../shared/radar-chart/radar-chart';
import { SalesRegionStore } from '../../../application/store/sales-region.store';

@Component({
  selector: 'app-sales-by-region',
  imports: [RadarChart],
  templateUrl: './sales-by-region.html',
  styleUrl: './sales-by-region.scss',
})
export class SalesByRegion implements AfterViewInit {
  protected readonly store = inject(SalesRegionStore);

  ngAfterViewInit(): void {
    this.store.loadSalesRegion();
  }
}
