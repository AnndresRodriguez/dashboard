# Cypress E2E Testing

Este directorio contiene los tests end-to-end (E2E) usando Cypress para el dashboard.

## Estructura

```
cypress/
├── e2e/                 # Tests E2E
├── fixtures/            # Datos de prueba
├── support/             # Archivos de soporte
│   ├── commands.ts      # Comandos personalizados
│   ├── e2e.ts          # Configuración E2E
│   └── component.ts    # Configuración de componentes
└── .eslintrc.json      # Configuración ESLint específica
```

## Comandos disponibles

### Ejecutar Cypress en modo interactivo
```bash
npm run cypress:open
```

### Ejecutar tests E2E en modo headless
```bash
npm run cypress:run
```

### Ejecutar tests E2E con servidor automático
```bash
npm run e2e
```

### Ejecutar tests E2E con servidor automático en modo interactivo
```bash
npm run e2e:open
```

## Comandos personalizados

### `cy.waitForAngular()`
Espera a que Angular esté listo antes de continuar con el test.

### `cy.shouldHaveClass(className)`
Verifica que un elemento tenga una clase CSS específica.

### `cy.shouldContainText(text)`
Verifica que un elemento contenga un texto específico.

## Configuración

- **Base URL**: `http://localhost:4200`
- **Viewport**: 1280x720
- **Timeouts**: 10 segundos por defecto
- **Videos**: Deshabilitados
- **Screenshots**: Habilitados en fallos

## Separación de tipos

Los tipos de Cypress están separados de Jest para evitar conflictos:
- Jest: `src/types/jest.d.ts`
- Cypress: `src/types/cypress.d.ts`
- Configuración TypeScript: `tsconfig.cypress.json`
