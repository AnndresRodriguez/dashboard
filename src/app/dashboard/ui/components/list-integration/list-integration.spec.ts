import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListIntegration } from './list-integration';
import { ListIntegrationStore } from '../../../application/store/list-integration.store';
import { Integration } from '../../../domain/models/integration';
import { mockGetIntegrationsUseCase } from '../../../../../testing/test-utils';
import { GetIntegrationsUseCase } from '../../../application/use-case/get-integrations.usecase';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CurrencyPipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

describe('ListIntegration', () => {
  let component: ListIntegration;
  let fixture: ComponentFixture<ListIntegration>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;
  let mockIntegrations: Integration[];

  beforeEach(async () => {
    // Create mock data
    mockIntegrations = [
      new Integration('1', 'App A', 'logo1.png', 'Type A', 75, 1500),
      new Integration('2', 'App B', 'logo2.png', 'Type B', 45, 2200),
      new Integration('3', 'App C', 'logo3.png', 'Type A', 90, 1800),
      new Integration('4', 'App D', 'logo4.png', 'Type C', 30, 1200),
      new Integration('5', 'App E', 'logo5.png', 'Type B', 60, 2500),
    ];

    await TestBed.configureTestingModule({
      imports: [
        ListIntegration,
        NgxSkeletonLoaderModule,
        CurrencyPipe,
        NgOptimizedImage,
      ],
      providers: [
        ListIntegrationStore,
        {
          provide: GetIntegrationsUseCase,
          useValue: mockGetIntegrationsUseCase,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListIntegration);
    component = fixture.componentInstance;
    store = TestBed.inject(ListIntegrationStore);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load integrations on ngOnInit', () => {
      const loadSpy = jest.spyOn(store, 'loadListIntegration');

      component.ngOnInit();

      expect(loadSpy).toHaveBeenCalled();
    });
  });

  describe('Selection Management', () => {
    beforeEach(() => {
      // Set up store with mock data
      (
        store as unknown as {
          listIntegration: { set: (data: Integration[]) => void };
        }
      ).listIntegration.set(mockIntegrations);
    });

    describe('allChecked', () => {
      it('should return true when all integrations are selected', () => {
        mockIntegrations.forEach((integration) =>
          integration.setSelected(true),
        );

        expect(component.allChecked()).toBe(true);
      });

      it('should return false when not all integrations are selected', () => {
        mockIntegrations[0].setSelected(true);
        mockIntegrations[1].setSelected(false);

        expect(component.allChecked()).toBe(false);
      });

      it('should return false when no integrations exist', () => {
        (
          store as unknown as {
            listIntegration: { set: (data: Integration[]) => void };
          }
        ).listIntegration.set([]);

        expect(component.allChecked()).toBe(false);
      });
    });

    describe('someChecked', () => {
      it('should return true when some integrations are selected', () => {
        mockIntegrations[0].setSelected(true);
        mockIntegrations[1].setSelected(false);

        expect(component.someChecked()).toBe(true);
      });

      it('should return false when no integrations are selected', () => {
        mockIntegrations.forEach((integration) =>
          integration.setSelected(false),
        );

        expect(component.someChecked()).toBe(false);
      });

      it('should return false when all integrations are selected', () => {
        mockIntegrations.forEach((integration) =>
          integration.setSelected(true),
        );

        expect(component.someChecked()).toBe(false);
      });
    });

    describe('toggleAll', () => {
      it('should select all integrations when checked is true', () => {
        mockIntegrations.forEach((integration) =>
          integration.setSelected(false),
        );

        component.toggleAll(true);

        mockIntegrations.forEach((integration) => {
          expect(integration.isSelected).toBe(true);
        });
      });

      it('should deselect all integrations when checked is false', () => {
        mockIntegrations.forEach((integration) =>
          integration.setSelected(true),
        );

        component.toggleAll(false);

        mockIntegrations.forEach((integration) => {
          expect(integration.isSelected).toBe(false);
        });
      });
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      (
        store as unknown as {
          listIntegration: { set: (data: Integration[]) => void };
        }
      ).listIntegration.set(mockIntegrations);
    });

    describe('sortBy', () => {
      it('should set new sort key and direction when sorting by different key', () => {
        component.sortKey.set('application');
        component.sortDir.set('asc');

        component.sortBy('type');

        expect(component.sortKey()).toBe('type');
        expect(component.sortDir()).toBe('asc');
      });

      it('should toggle direction when sorting by same key', () => {
        component.sortKey.set('application');
        component.sortDir.set('asc');

        component.sortBy('application');

        expect(component.sortKey()).toBe('application');
        expect(component.sortDir()).toBe('desc');
      });

      it('should cycle from desc to asc when sorting by same key again', () => {
        component.sortKey.set('application');
        component.sortDir.set('desc');

        component.sortBy('application');

        expect(component.sortKey()).toBe('application');
        expect(component.sortDir()).toBe('asc');
      });
    });

    describe('sortedRows', () => {
      it('should sort by application in ascending order', () => {
        component.sortKey.set('application');
        component.sortDir.set('asc');

        const sorted = component.sortedRows();

        expect(sorted[0].application).toBe('App A');
        expect(sorted[1].application).toBe('App B');
        expect(sorted[2].application).toBe('App C');
      });

      it('should sort by application in descending order', () => {
        component.sortKey.set('application');
        component.sortDir.set('desc');

        const sorted = component.sortedRows();

        expect(sorted[0].application).toBe('App E');
        expect(sorted[1].application).toBe('App D');
        expect(sorted[2].application).toBe('App C');
      });

      it('should sort by rate in ascending order', () => {
        component.sortKey.set('rate');
        component.sortDir.set('asc');

        const sorted = component.sortedRows();

        expect(sorted[0].rate).toBe(30);
        expect(sorted[1].rate).toBe(45);
        expect(sorted[2].rate).toBe(60);
      });

      it('should sort by profit in descending order', () => {
        component.sortKey.set('profit');
        component.sortDir.set('desc');

        const sorted = component.sortedRows();

        expect(sorted[0].profit).toBe(2500);
        expect(sorted[1].profit).toBe(2200);
        expect(sorted[2].profit).toBe(1800);
      });

      it('should sort by type in ascending order', () => {
        component.sortKey.set('type');
        component.sortDir.set('asc');

        const sorted = component.sortedRows();

        expect(sorted[0].type).toBe('Type A');
        expect(sorted[1].type).toBe('Type A');
        expect(sorted[2].type).toBe('Type B');
      });
    });

    describe('isSorted', () => {
      it('should return current sort direction for active sort key', () => {
        component.sortKey.set('application');
        component.sortDir.set('asc');

        expect(component.isSorted('application')).toBe('asc');
      });

      it('should return undefined for inactive sort key', () => {
        component.sortKey.set('application');
        component.sortDir.set('asc');

        expect(component.isSorted('type')).toBeUndefined();
      });
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      (
        store as unknown as {
          listIntegration: { set: (data: Integration[]) => void };
        }
      ).listIntegration.set(mockIntegrations);
    });

    describe('setPage', () => {
      it('should not set page below 1', () => {
        component.setPage(0);

        expect(component.page()).toBe(1);
      });

      it('should not set page above page count', () => {
        component.pageSize.set(2); // 5 items / 2 per page = 3 pages
        component.setPage(5);

        expect(component.page()).toBe(3);
      });
    });

    describe('next', () => {
      it('should not increment beyond page count', () => {
        component.pageSize.set(2); // 5 items / 2 per page = 3 pages
        component.page.set(3);

        component.next();

        expect(component.page()).toBe(3);
      });
    });

    describe('prev', () => {
      it('should decrement page by 1', () => {
        component.page.set(2);

        component.prev();

        expect(component.page()).toBe(1);
      });

      it('should not decrement below 1', () => {
        component.page.set(1);

        component.prev();

        expect(component.page()).toBe(1);
      });
    });

    describe('pageCount', () => {
      it('should calculate correct page count', () => {
        component.pageSize.set(2); // 5 items / 2 per page = 3 pages

        expect(component.pageCount()).toBe(3);
      });

      it('should return at least 1 page even with empty data', () => {
        (
          store as unknown as {
            listIntegration: { set: (data: Integration[]) => void };
          }
        ).listIntegration.set([]);

        expect(component.pageCount()).toBe(1);
      });
    });

    describe('total', () => {
      it('should return total number of sorted rows', () => {
        expect(component.total()).toBe(5);
      });
    });

    describe('pagedRows', () => {
      it('should return correct page of data', () => {
        component.pageSize.set(2);
        component.page.set(1);

        const paged = component.pagedRows();

        expect(paged.length).toBe(2);
        expect(paged[0].id).toBe('1');
        expect(paged[1].id).toBe('2');
      });

      it('should return correct second page', () => {
        component.pageSize.set(2);
        component.page.set(2);

        const paged = component.pagedRows();

        expect(paged.length).toBe(2);
        expect(paged[0].id).toBe('3');
        expect(paged[1].id).toBe('4');
      });

      it('should return remaining items on last page', () => {
        component.pageSize.set(2);
        component.page.set(3);

        const paged = component.pagedRows();

        expect(paged.length).toBe(1);
        expect(paged[0].id).toBe('5');
      });

      it('should return empty array for invalid page', () => {
        component.pageSize.set(2);
        component.page.set(10);

        const paged = component.pagedRows();

        expect(paged.length).toBe(0);
      });
    });
  });

  describe('Store Integration', () => {
    it('should call store.loadListIntegration on ngOnInit', () => {
      const loadSpy = jest.spyOn(store, 'loadListIntegration');

      component.ngOnInit();

      expect(loadSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Signal Management', () => {
    it('should properly manage sortKey signal', () => {
      component.sortKey.set('type');
      expect(component.sortKey()).toBe('type');

      component.sortKey.set('rate');
      expect(component.sortKey()).toBe('rate');
    });

    it('should properly manage sortDir signal', () => {
      component.sortDir.set('desc');
      expect(component.sortDir()).toBe('desc');

      component.sortDir.set('asc');
      expect(component.sortDir()).toBe('asc');
    });

    it('should properly manage page signal', () => {
      component.page.set(3);
      expect(component.page()).toBe(3);

      component.page.set(1);
      expect(component.page()).toBe(1);
    });

    it('should properly manage pageSize signal', () => {
      component.pageSize.set(10);
      expect(component.pageSize()).toBe(10);

      component.pageSize.set(20);
      expect(component.pageSize()).toBe(20);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty integration list', () => {
      (
        store as unknown as {
          listIntegration: { set: (data: Integration[]) => void };
        }
      ).listIntegration.set([]);

      expect(component.allChecked()).toBe(false);
      expect(component.someChecked()).toBe(false);
      expect(component.total()).toBe(0);
      expect(component.pageCount()).toBe(1);
      expect(component.pagedRows().length).toBe(0);
    });

    it('should handle single integration', () => {
      const singleIntegration = [
        new Integration('1', 'App A', 'logo1.png', 'Type A', 75, 1500),
      ];
      (
        store as unknown as {
          listIntegration: { set: (data: Integration[]) => void };
        }
      ).listIntegration.set(singleIntegration);

      expect(component.total()).toBe(1);
      expect(component.pageCount()).toBe(1);
      expect(component.pagedRows().length).toBe(1);
    });
  });
});
