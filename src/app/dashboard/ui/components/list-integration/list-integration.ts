import { CurrencyPipe } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Integration {
  id: number;
  name: 'Stripe' | 'Zapier' | 'Shopify';
  type: 'Finance' | 'CRM' | 'Marketplace';
  ratePct: number;
  profitUsd: number;
  selected?: boolean;
}

type SortKey = 'name' | 'type' | 'ratePct' | 'profitUsd';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-list-integration',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './list-integration.html',
  styleUrl: './list-integration.scss',
})
export class ListIntegration {
  rows = signal<Integration[]>([
    {
      id: 1,
      name: 'Stripe',
      type: 'Finance',
      ratePct: 33,
      profitUsd: 10998.28,
    },
    { id: 2, name: 'Zapier', type: 'CRM', ratePct: 27, profitUsd: 8998.59 },
    {
      id: 3,
      name: 'Shopify',
      type: 'Marketplace',
      ratePct: 40,
      profitUsd: 13331.24,
    },
  ]);

  // ---- Selección
  allChecked = computed(() => {
    const rows = this.rows();
    return rows.length > 0 && rows.every((r) => r.selected);
  });

  someChecked = computed(() => {
    const rows = this.rows();
    return !this.allChecked() && rows.some((r) => r.selected);
  });

  toggleAll(checked: boolean) {
    this.rows.update((rows) => rows.map((r) => ({ ...r, selected: checked })));
  }

  // ---- Ordenamiento
  sortKey = signal<SortKey>('name');
  sortDir = signal<SortDir>('asc');

  sortBy(key: SortKey) {
    if (this.sortKey() === key) {
      this.sortDir.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }

  sortedRows = computed(() => {
    const rows = this.rows();
    const sortKey = this.sortKey();
    const sortDir = this.sortDir();
    const arr = [...rows];
    const dir = sortDir === 'asc' ? 1 : -1;
    return arr.sort((a: Integration, b: Integration) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'string' && typeof vb === 'string')
        return va.localeCompare(vb) * dir;
      return ((va as number) - (vb as number)) * dir;
    });
  });

  // ---- Paginación
  page = signal(1);
  pageSize = signal(5);
  pageSizes = [5, 10, 20];

  total = computed(() => this.sortedRows().length);

  pageCount = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );

  setPage(p: number) {
    const pageCount = this.pageCount();
    this.page.set(Math.min(pageCount, Math.max(1, p)));
  }

  next() {
    this.setPage(this.page() + 1);
  }

  prev() {
    this.setPage(this.page() - 1);
  }

  pagedRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.sortedRows().slice(start, start + this.pageSize());
  });

  // ---- Helpers UI
  isSorted(key: SortKey) {
    return this.sortKey() === key ? this.sortDir() : undefined;
  }
}
