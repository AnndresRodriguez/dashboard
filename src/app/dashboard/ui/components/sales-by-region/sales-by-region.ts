import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { RadarChart } from '../shared/radar-chart/radar-chart';
import { SaleRegion } from '../../../domain/models/sales-region';
import { GetSalesRegionUseCase } from '../../../application/use-case/get-sales-region.usecase';

@Component({
  selector: 'app-sales-by-region',
  imports: [RadarChart],
  templateUrl: './sales-by-region.html',
  styleUrl: './sales-by-region.scss',
})
export class SalesByRegion implements AfterViewInit {
  private readonly getSalesRegionUseCase = inject(GetSalesRegionUseCase);

  protected readonly salesRegion = signal<SaleRegion[]>([]);

  ngAfterViewInit(): void {
    this.getSalesRegionUseCase.execute().subscribe({
      next: (data) => this.salesRegion.set(data),
      error: (error) => console.error(error),
    });
  }
}
