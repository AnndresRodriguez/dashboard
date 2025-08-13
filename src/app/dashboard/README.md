# Dashboard - Arquitectura Limpia con NgRx Signals

## Mejores Prácticas para Consumir Datos

### ❌ **NO HACER**: Consumir directamente desde Casos de Uso

```typescript
// ❌ MAL: Consumir directamente del caso de uso
export class SalesMetrics implements AfterViewInit {
  private readonly getStatsUseCase = inject(GetSalesMetricsUseCase);
  protected readonly stats = signal<SalesMetricResponse[]>([]);

  ngAfterViewInit(): void {
    this.getStatsUseCase.execute().subscribe({
      next: (stats) => this.stats.set(stats),
      error: (error) => console.error(error),
    });
  }
}
```

### ✅ **HACER**: Consumir desde el Store Global

```typescript
// ✅ BIEN: Consumir desde el store
export class SalesMetrics implements AfterViewInit {
  protected readonly store = inject(SalesMetricStore);

  ngAfterViewInit(): void {
    this.store.loadSalesMetrics();
  }
}
```

## Ventajas de Consumir desde el Store

### 1. **Estado Centralizado**
- Un solo lugar para toda la información
- Evita duplicación de datos
- Facilita el debugging

### 2. **Reactividad Automática**
- Los componentes se actualizan automáticamente
- No necesitas manejar manualmente los signals
- Mejor performance con detección de cambios

### 3. **Caching Inteligente**
- Evita llamadas innecesarias a la API
- Los datos persisten entre navegaciones
- Mejor experiencia de usuario

### 4. **Manejo de Estados**
- Loading, error, empty states centralizados
- Consistencia en toda la aplicación
- Reutilización de lógica

### 5. **Testing Simplificado**
- Más fácil de testear
- Mocks centralizados
- Mejor cobertura de código

## Estructura del Store

```typescript
export const SalesMetricStore = signalStore(
  { providedIn: 'root' },
  withState(SalesMetricState),
  withComputed((state) => ({
    // Computed signals para derivar datos
    totalMetrics: computed(() => state.salesMetrics().length),
    hasError: computed(() => state.error() !== null),
    isEmpty: computed(() => state.salesMetrics().length === 0 && !state.loading()),
  })),
  withMethods((state, getSalesMetricsUseCase = inject(GetSalesMetricsUseCase)) => ({
    // Métodos para manejar el estado
    loadSalesMetrics() {
      patchState(state, { loading: true, error: null });
      
      getSalesMetricsUseCase.execute().subscribe({
        next: (metricsResponse) => {
          const metrics = metricsResponse.map(SaleMetric.fromApiResponse);
          patchState(state, { salesMetrics: metrics, loading: false });
        },
        error: (error) => {
          patchState(state, {
            error: error.message || 'Error al cargar métricas de ventas',
            loading: false,
          });
        },
      });
    },
  }))
);
```

## Flujo de Datos Recomendado

```
UI Component → Store → Use Case → Port → Adapter → API
     ↑           ↓
     └───────────┘
   Consume Data
```

### 1. **UI Component**
- Inyecta el store
- Llama a métodos del store
- Consume signals reactivos

### 2. **Store**
- Maneja el estado global
- Contiene métodos para cargar datos
- Proporciona computed signals

### 3. **Use Case**
- Contiene lógica de negocio
- Es llamado por el store
- No es consumido directamente por la UI

### 4. **Port & Adapter**
- Abstracción de la infraestructura
- Manejo de datos externos
- Transformación de datos

## Template con Estados

```html
@if (store.loading()) {
  <!-- Loading state -->
  <div class="loading-spinner">Cargando...</div>
} @else if (store.hasError()) {
  <!-- Error state -->
  <div class="error-message">
    <p>{{ store.error() }}</p>
    <button (click)="store.loadSalesMetrics()">Reintentar</button>
  </div>
} @else if (store.isEmpty()) {
  <!-- Empty state -->
  <div class="empty-state">No hay datos disponibles</div>
} @else {
  <!-- Success state -->
  @for (item of store.data(); track item.id) {
    <app-item [data]="item"></app-item>
  }
}
```

## Beneficios de esta Arquitectura

1. **Separación de Responsabilidades**: Cada capa tiene su responsabilidad específica
2. **Testabilidad**: Fácil de testear cada componente por separado
3. **Mantenibilidad**: Código más limpio y organizado
4. **Escalabilidad**: Fácil de extender y modificar
5. **Performance**: Mejor rendimiento con signals reactivos
6. **UX**: Mejor experiencia de usuario con estados bien manejados

## Conclusión

La **mejor práctica** es consumir datos desde el **store global** (NgRx Signals) en lugar de directamente desde los casos de uso. Esto proporciona:

- Estado centralizado y reactivo
- Mejor manejo de estados (loading, error, empty)
- Caching automático
- Mejor performance
- Código más mantenible y testeable
