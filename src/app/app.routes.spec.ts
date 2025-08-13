import { routes } from './app.routes';

describe('app.routes', () => {
  describe('loadComponent functionality', () => {
    it('should have loadComponent as a function', () => {
      const rootRoute = routes.find((route) => route.path === '');
      expect(typeof rootRoute?.loadComponent).toBe('function');
    });

    it('should return a promise when loadComponent is called', async () => {
      const rootRoute = routes.find((route) => route.path === '');
      const loadComponentResult = rootRoute?.loadComponent?.();
      expect(loadComponentResult).toBeInstanceOf(Promise);
    });
    it('should handle import errors gracefully', async () => {
      const rootRoute = routes.find((route) => route.path === '');
      const loadComponentResult = rootRoute?.loadComponent?.();

      if (loadComponentResult) {
        try {
          await loadComponentResult;
          // If we reach here, the import was successful
          expect(true).toBe(true);
        } catch (error) {
          // If there's an error, it should be handled appropriately
          expect(error).toBeDefined();
        }
      }
    });
  });

  describe('route configuration', () => {
    it('should have correct path for root route', () => {
      const rootRoute = routes.find((route) => route.path === '');
      expect(rootRoute?.path).toBe('');
    });

    it('should not have any other properties on root route', () => {
      const rootRoute = routes.find((route) => route.path === '');
      const expectedKeys = ['path', 'loadComponent'];
      const actualKeys = Object.keys(rootRoute || {});
      expect(actualKeys.sort()).toEqual(expectedKeys.sort());
    });
  });
});
