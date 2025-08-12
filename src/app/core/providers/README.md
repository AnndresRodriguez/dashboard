# Providers Structure

Esta carpeta contiene toda la configuración de providers de la aplicación organizada por categorías.

## Estructura

```
providers/
├── index.ts          # Archivo de índice para exportaciones
├── providers.ts      # Configuración principal de providers
└── README.md         # Esta documentación
```

## Categorías de Providers

### 1. Angular Core Providers (`angularCoreProviders`)
- `provideBrowserGlobalErrorListeners()` - Manejo de errores globales
- `provideZonelessChangeDetection()` - Detección de cambios sin zonas
- `provideRouter(routes)` - Configuración de rutas
- `provideHttpClient()` - Cliente HTTP

### 2. Third Party Providers (`thirdPartyProviders`)
- `provideEchartsCore()` - Configuración de ECharts para gráficos

### 3. Application Providers (`applicationProviders`)
- `APP_ENV` - Token de inyección para variables de entorno

### 4. Domain Providers (`domainProviders`)
- `StatsPort` → `SalesAdapter` - Implementación del puerto de estadísticas
- `GetStatsUseCase` - Caso de uso para obtener estadísticas

## Uso

```typescript
// Importar todos los providers
import { allProviders } from './shared/providers';

// Importar categorías específicas
import { domainProviders, angularCoreProviders } from './shared/providers';

// Importar tokens específicos
import { APP_ENV } from './shared/providers';
```

## Ventajas

- ✅ **Organización**: Providers agrupados por responsabilidad
- ✅ **Mantenibilidad**: Fácil de encontrar y modificar
- ✅ **Escalabilidad**: Fácil agregar nuevos providers
- ✅ **Reutilización**: Categorías pueden usarse independientemente
- ✅ **Testing**: Fácil mockear providers específicos
