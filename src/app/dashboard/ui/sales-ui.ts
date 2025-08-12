import { Component } from '@angular/core';
import { SalesOverview } from './components/sales-overview/sales-overview';
import { SalesByRegion } from './components/sales-by-region/sales-by-region';
import { ListIntegration } from './components/list-integration/list-integration';
import { SalesMetrics } from './components/sales-metrics/sales-metrics';
import { RegisteredUsers } from './components/registered-users/registered-users';

@Component({
  selector: 'app-sales-ui',
  imports: [
    SalesMetrics,
    SalesOverview,
    SalesByRegion,
    RegisteredUsers,
    ListIntegration,
  ],
  templateUrl: './sales-ui.html',
  styleUrl: './sales-ui.scss',
})
export class SalesUi {}
