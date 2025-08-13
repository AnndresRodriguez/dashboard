# 🚀 Dashboard (FinData) - Arquitectura Limpia con Angular

Un dashboard moderno construido con **Angular 20** siguiendo los principios de **Arquitectura Limpia (Clean Architecture)** y utilizando **NgRx Signals** para el manejo de estado reactivo.

## 🎯 Demo

[🔗 **Ver Demo en Vivo**](https://dashboard-findata.netlify.app/) <!-- Aquí puedes agregar el enlace al demo cuando esté disponible -->

### Características del Demo
- 📊 Dashboard interactivo con métricas en tiempo real
- 📈 Gráficos responsivos con ECharts
- 🌙 Cambio de tema oscuro/claro
- 📱 Diseño responsive para móviles
- ⚡ Carga rápida con signals reactivos

---

## 📋 Tabla de Contenidos
- [Demo](#-demo)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Ejecución Local](#-ejecución-local)
- [Testing](#-testing)
- [API Endpoints](#-api-endpoints)
- [Estados de la UI](#-estados-de-la-ui)
- [Scripts Disponibles](#-scripts-disponibles)

## ✨ Características

- 🏗️ **Arquitectura Limpia**: Separación clara de responsabilidades entre capas
- ⚡ **NgRx Signals**: Estado reactivo y performante
- 📊 **ECharts**: Gráficos interactivos y responsivos
- 🎨 **Tailwind CSS**: Estilos modernos y utilitarios
- 🧪 **Jest**: Testing unitario completo
- 📱 **Responsive Design**: Optimizado para todos los dispositivos
- 🌙 **Tema Oscuro/Claro**: Soporte para múltiples temas

## 🛠️ Tecnologías

### Frontend
- **Angular 20.1.0** - Framework principal
- **TypeScript 5.8.2** - Lenguaje de programación
- **NgRx Signals 20.0.0** - Manejo de estado reactivo
- **RxJS 7.8.0** - Programación reactiva

### UI/UX
- **Tailwind CSS 4.1.11** - Framework de CSS utilitario
- **ECharts 6.0.0** - Biblioteca de gráficos
- **ngx-echarts 20.0.1** - Integración de ECharts con Angular
- **Material Design Icons** - Iconografía

### Testing
- **Jest 29.5.0** - Framework de testing
- **jest-preset-angular 14.0.0** - Preset para Angular
- **jest-html-reporter 4.3.0** - Reportes HTML de tests

### Herramientas de Desarrollo
- **ESLint 9.29.0** - Linter de código
- **Prettier 3.6.2** - Formateador de código
- **PostCSS 8.5.6** - Procesador de CSS

## 🏗️ Arquitectura

Este proyecto implementa **Arquitectura Limpia** con las siguientes capas:

### Flujo de Datos
```
UI Component → Store → Use Case → Port → Adapter → API
     ↑           ↓
     └───────────┘
   Consume Data
```

### Capas de la Arquitectura

#### 1. **Domain Layer** (`src/app/dashboard/domain/`)
- **Interfaces**: Contratos de datos (`*.interface.ts`)
- **Models**: Entidades de dominio (`*.ts`)
- **Ports**: Abstracciones de infraestructura (`*.port.ts`)

#### 2. **Application Layer** (`src/app/dashboard/application/`)
- **Use Cases**: Lógica de negocio (`*.usecase.ts`)
- **Store**: Manejo de estado con NgRx Signals (`*.store.ts`)

#### 3. **Infrastructure Layer** (`src/app/dashboard/infrastructure/`)
- **Adapters**: Implementaciones concretas (`*.adapter.ts`)
- **DTOs**: Objetos de transferencia de datos (`*.ts`)

#### 4. **UI Layer** (`src/app/dashboard/ui/`)
- **Components**: Componentes de presentación
- **Shared Components**: Componentes reutilizables
- **Enums**: Constantes y enumeraciones

## 📁 Estructura del Proyecto

```
src/app/dashboard/
├── domain/                    # Capa de dominio
│   ├── interfaces/           # Contratos de datos
│   ├── models/              # Entidades de dominio
│   └── ports/               # Abstracciones de infraestructura
├── application/              # Capa de aplicación
│   ├── store/               # Stores con NgRx Signals
│   └── use-case/            # Casos de uso
├── infrastructure/           # Capa de infraestructura
│   ├── adapters/            # Implementaciones concretas
│   └── dtos/                # Objetos de transferencia
└── ui/                      # Capa de presentación
    ├── components/          # Componentes específicos
    │   ├── sales-metrics/   # Métricas de ventas
    │   ├── sales-overview/  # Resumen de ventas
    │   ├── sales-by-region/ # Ventas por región
    │   ├── registered-users/ # Usuarios registrados
    │   ├── list-integration/ # Lista de integraciones
    │   └── shared/          # Componentes compartidos
    │       ├── card-metric/ # Tarjeta de métrica
    │       ├── donut-chart/ # Gráfico de dona
    │       ├── line-chart/  # Gráfico de líneas
    │       └── radar-chart/ # Gráfico de radar
    └── enums/               # Constantes y enumeraciones
```
## 🔌 API Endpoints

Este proyecto consume datos de la API **DummyJSON** (`https://dummyjson.com`) para simular datos reales del dashboard.

### Base URL
```
https://dummyjson.com
```

### Endpoints Consumidos

| Endpoint | Método | Descripción | ID JSON |
|----------|--------|-------------|---------|
| `https://dummyjson.com/c/1dbe-8a86-4247-8d53` | `GET` | Métricas de ventas | `1dbe-8a86-4247-8d53` |
| `https://dummyjson.com/c/66ff-e4d9-4d77-80c1` | `GET` | Resumen general de ventas | `66ff-e4d9-4d77-80c1` |
| `https://dummyjson.com/c/7e36-14ca-4b32-a6b4` | `GET` | Ventas por región | `7e36-14ca-4b32-a6b4` |
| `https://dummyjson.com/c/e3d8-2efc-4e24-a7bc` | `GET` | Usuarios registrados | `e3d8-2efc-4e24-a7bc` |
| `https://dummyjson.com/c/3bde-f00f-4eb3-a567` | `GET` | Integraciones disponibles | `3bde-f00f-4eb3-a567` |

### Estructura de Respuesta

Todos los endpoints devuelven datos en el siguiente formato:

```json
{
  "stats": [...],           // Para métricas de ventas
  "salesOverview": {...},   // Para resumen de ventas
  "regionStats": [...],     // Para ventas por región
  "users": {...},           // Para usuarios registrados
  "integrations": [...]     // Para integraciones
}
```

### Configuración de la API

La URL base se configura en el archivo de environment:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://dummyjson.com',
};
```

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd dashboard
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

## 🏃‍♂️ Ejecución Local

### Servidor de Desarrollo
```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

### Build de Producción
```bash
npm run build
```

### Build en Modo Watch
```bash
npm run watch
```

## 🧪 Testing

### Ejecutar Tests Unitarios
```bash
npm test
```

### Tests en Modo Watch
```bash
npm run test:watch
```

### Tests con Cobertura
```bash
npm run test:coverage
```

Los reportes de cobertura se generan en `reports/test-report.html`

### Estructura de Tests
```
src/app/dashboard/
├── domain/models/test/      # Tests de modelos
├── application/store/test/  # Tests de stores
├── application/use-case/test/ # Tests de casos de uso
├── infrastructure/adapters/test/ # Tests de adaptadores
└── ui/components/test/      # Tests de componentes
```

### Manejo de Errores

Los adaptadores manejan automáticamente:
- ✅ Respuestas exitosas (200)
- ❌ Errores de red
- ⏱️ Timeouts de conexión
- 🔄 Reintentos automáticos

### Notas Importantes

- **Datos Simulados**: Todos los datos son simulados para propósitos de demostración
- **Sin Autenticación**: La API no requiere tokens de autenticación
- **Rate Limiting**: Respeta los límites de la API de DummyJSON
- **CORS**: Configurado para permitir peticiones desde localhost

## 🎨 Estados de la UI

### Estado de Carga (Skeleton Loading)

El dashboard implementa un sistema de carga elegante utilizando **ngx-skeleton-loader** que proporciona una experiencia de usuario fluida mientras se cargan los datos.
<img width="1074" height="790" alt="Estados de Carga" src="https://github.com/user-attachments/assets/2eb05e8e-3857-40c4-af64-3c37c5a4bd5f" />

**Características del Skeleton Loading:**
- ⚡ **Carga Inmediata**: Los skeletons aparecen instantáneamente
- 🎯 **Forma Realista**: Mantiene la estructura visual del contenido final
- 🌊 **Animación Suave**: Efecto de pulso que indica actividad
- 📱 **Responsive**: Se adapta a diferentes tamaños de pantalla
- 🎨 **Tema Consistente**: Coincide con el diseño del dashboard

### Estado de Error

Cuando ocurre un error en la carga de datos, el dashboard muestra un estado de error informativo y amigable.
<img width="1432" height="659" alt="Estados de Error" src="https://github.com/user-attachments/assets/37fe7733-7e8c-4352-817e-7b7970e7c9f4" />


![Estado de Error](./assets/error-state.png)

**Características del Estado de Error:**
- ❌ **Mensaje Claro**: Información específica sobre el error
- 🔄 **Opción de Reintento**: Botón para intentar cargar nuevamente
- 🎨 **Diseño Consistente**: Mantiene la estética del dashboard
- 📱 **Responsive**: Se adapta a dispositivos móviles
- 🎯 **UX Amigable**: No interrumpe la experiencia del usuario

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run watch` | Construye en modo watch |
| `npm test` | Ejecuta tests unitarios |
| `npm run test:watch` | Ejecuta tests en modo watch |
| `npm run test:coverage` | Ejecuta tests con cobertura |
| `npm run lint` | Ejecuta el linter |
| `npm run lint:fix` | Corrige errores del linter automáticamente |

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando Angular y Arquitectura Limpia**
