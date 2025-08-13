import { AfterViewInit, Component, inject } from '@angular/core';
import { RadarChart } from '../shared/radar-chart/radar-chart';
import { SalesRegionStore } from '../../../application/store/sales-region.store';
import { DarkLightStore } from '../../store/dark-light.store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-sales-by-region',
  imports: [RadarChart, NgxSkeletonLoaderModule],
  templateUrl: './sales-by-region.html',
  styleUrl: './sales-by-region.scss',
})
export class SalesByRegion implements AfterViewInit {
  protected readonly store = inject(SalesRegionStore);
  protected readonly modeStore = inject(DarkLightStore);

  ngAfterViewInit(): void {
    this.store.loadSalesRegion();
  }
}
