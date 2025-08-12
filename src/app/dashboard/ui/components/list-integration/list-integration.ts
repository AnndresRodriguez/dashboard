import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { GetIntegrationsUseCase } from '../../../application/use-case/get-integrations.usecase';
import { Integration } from '../../../domain/models/integration';

type SortKey = 'application' | 'type' | 'rate' | 'profit';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-list-integration',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './list-integration.html',
  styleUrl: './list-integration.scss',
})
export class ListIntegration implements OnInit {
  private readonly getIntegrationsUseCase = inject(GetIntegrationsUseCase);

  rows = signal<Integration[]>([]);

  ngOnInit() {
    this.getIntegrationsUseCase.execute().subscribe((integrations) => {
      this.rows.set(integrations);
    });
  }
  // ---- Selección
  allChecked = computed(() => {
    const rows = this.rows();
    return rows.length > 0 && rows.every((r) => r.isSelected);
  });

  someChecked = computed(() => {
    const rows = this.rows();
    return !this.allChecked() && rows.some((r) => r.isSelected);
  });

  toggleAll(checked: boolean) {
    this.rows.update((rows) =>
      rows.map((r) => {
        r.setSelected(checked);
        return r;
      }),
    );
  }

  // ---- Ordenamiento
  sortKey = signal<SortKey>('application');
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
