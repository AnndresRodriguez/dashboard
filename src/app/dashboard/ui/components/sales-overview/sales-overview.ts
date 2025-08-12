import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { LineChart } from '../shared/line-chart/line-chart';
import { SalesOverviewData } from '../../../domain/interfaces/sales-overview.interface';
import { GetSalesOverviewUseCase } from '../../../application/use-case/get-sales-overview.usecase';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-sales-overview',
  imports: [LineChart, DecimalPipe],
  templateUrl: './sales-overview.html',
  styleUrl: './sales-overview.scss',
})
export class SalesOverview implements AfterViewInit {
  private readonly getSalesOverviewUseCase = inject(GetSalesOverviewUseCase);

  protected readonly salesOverview = signal<SalesOverviewData>({
    totalRevenue: 0,
    totalTarget: 0,
    data: [],
  });

  ngAfterViewInit(): void {
    this.getSalesOverviewUseCase.execute().subscribe({
      next: (data) => this.salesOverview.set(data),
      error: (error) => console.error(error),
    });
  }
}
