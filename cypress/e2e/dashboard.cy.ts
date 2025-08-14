/// <reference types="cypress" />

describe('Dashboard - Sales Metrics', () => {
  beforeEach(() => {
    // Visitar la página principal del dashboard
    cy.visit('/');
  });

  it('should display the sales metrics section', () => {
    cy.waitForAngular();

    // Verificar que el contenedor principal existe
    cy.get('.main-container').should('be.visible');

    // Verificar que la sección de métricas existe
    cy.get('[data-test-id="sales-metrics-container"]').should('be.visible');
    cy.get('app-sales-metrics').should('be.visible');
  });

  it('should show loading state initially', () => {
    // Verificar que se muestran los skeletons de carga
    cy.get('[data-test-id="loading-skeleton-container"]').should('be.visible');
    cy.get('[data-test-id="metric-skeleton-loader"]').should('be.visible');
    cy.get('[data-test-id="metric-skeleton-loader"]').should(
      'have.length.at.least',
      1,
    );
  });

  it('should display sales metrics cards after loading', () => {
    // Esperar a que se carguen las métricas (máximo 10 segundos)
    cy.get('[data-test-id="metric-card"]', { timeout: 10000 }).should(
      'be.visible',
    );

    // Verificar que hay al menos una métrica
    cy.get('[data-test-id="metric-card"]').should('have.length.at.least', 1);

    // Verificar la estructura de cada card de métrica
    cy.get('[data-test-id="metric-card"]')
      .first()
      .within(() => {
        // Verificar que tiene título
        cy.get('[data-test-id="metric-title"]').should('be.visible');

        // Verificar que tiene valor
        cy.get('[data-test-id="metric-value"]').should('be.visible');

        // Verificar que tiene porcentaje de cambio
        cy.get('[data-test-id="metric-percentage-container"]').should(
          'be.visible',
        );

        // Verificar que tiene descripción
        cy.get('[data-test-id="metric-description"]').should('be.visible');
      });
  });

  it('should display correct metric information', () => {
    // Esperar a que se carguen las métricas
    cy.get('[data-test-id="metric-card"]', { timeout: 10000 }).should(
      'be.visible',
    );

    // Verificar que el título no esté vacío
    cy.get('[data-test-id="metric-card"]')
      .first()
      .find('[data-test-id="metric-title"]')
      .should('not.be.empty');

    // Verificar que el valor no esté vacío
    cy.get('[data-test-id="metric-card"]')
      .first()
      .find('[data-test-id="metric-value"]')
      .should('not.be.empty');

    // Verificar que el porcentaje de cambio existe
    cy.get('[data-test-id="metric-card"]')
      .first()
      .find('[data-test-id="metric-percentage-value"]')
      .should('be.visible');
  });

  it('should handle error state correctly', () => {
    // Interceptar la llamada a la API y forzar un error
    cy.intercept('GET', '**/c/1dbe-8a86-4247-8d53**', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('salesMetricsError');

    // Recargar la página para que se ejecute la llamada interceptada
    cy.reload();

    // Verificar que se muestra el mensaje de error
    cy.get('[data-test-id="error-container"]').should('be.visible');
    cy.get('[data-test-id="error-title"]').should('be.visible');
    cy.get('[data-test-id="error-message"]').should('be.visible');

    // Verificar que existe el botón de reintentar
    cy.get('[data-test-id="retry-button"]').should('be.visible');
  });

  it('should retry loading when clicking retry button', () => {
    // Interceptar la llamada a la API y forzar un error
    cy.intercept('GET', '**/c/1dbe-8a86-4247-8d53**', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('salesMetricsError');

    // Recargar la página
    cy.reload();

    // Esperar a que aparezca el estado de error
    cy.get('[data-test-id="error-container"]').should('be.visible');

    // Interceptar la llamada exitosa después del reintento
    cy.intercept('GET', '**/c/1dbe-8a86-4247-8d53**', {
      statusCode: 200,
      body: {
        stats: [
          {
            title: 'Ventas Totales',
            value: 150000,
            currency: 'USD',
            percentageChange: 12.5,
            changeType: 'UP',
            description: 'vs mes anterior',
          },
        ],
      },
    }).as('salesMetricsSuccess');

    // Hacer clic en el botón de reintentar
    cy.get('[data-test-id="retry-button"]').click();

    // Verificar que se hace la nueva llamada
    cy.wait('@salesMetricsSuccess');

    // Verificar que se muestran las métricas
    cy.get('[data-test-id="metric-card"]').should('be.visible');
  });

  it('should display empty state when no data', () => {
    // Interceptar la llamada a la API y devolver array vacío
    cy.intercept('GET', '**/c/1dbe-8a86-4247-8d53**', {
      statusCode: 200,
      body: {
        stats: [],
      },
    }).as('salesMetricsEmpty');

    // Recargar la página
    cy.reload();

    // Verificar que se muestra el estado vacío
    cy.get('[data-test-id="empty-state-container"]').should('be.visible');
    cy.get('[data-test-id="empty-state-message"]').should('be.visible');
  });

  it('should display percentage change with correct icon', () => {
    // Esperar a que se carguen las métricas
    cy.get('[data-test-id="metric-card"]', { timeout: 10000 }).should(
      'be.visible',
    );

    // Verificar que los iconos de porcentaje existen
    cy.get('[data-test-id="metric-card"]').each(($card) => {
      cy.wrap($card).within(() => {
        // Verificar que existe el icono
        cy.get('[data-test-id="metric-percentage-icon"]').should('be.visible');

        // Verificar que el porcentaje es visible
        cy.get('[data-test-id="metric-percentage-value"]').should('be.visible');
      });
    });
  });

  it('should be responsive on different screen sizes', () => {
    // Esperar a que se carguen las métricas
    cy.get('[data-test-id="metric-card"]', { timeout: 10000 }).should(
      'be.visible',
    );

    // Verificar en pantalla grande
    cy.viewport(1280, 720);
    cy.get('[data-test-id="metric-card"]').should('be.visible');

    // Verificar en pantalla mediana
    cy.viewport(768, 1024);
    cy.get('[data-test-id="metric-card"]').should('be.visible');

    // Verificar en pantalla pequeña
    cy.viewport(375, 667);
    cy.get('[data-test-id="metric-card"]').should('be.visible');
  });

  it('should display metric card with all required elements', () => {
    // Esperar a que se carguen las métricas
    cy.get('[data-test-id="metric-card"]', { timeout: 10000 }).should(
      'be.visible',
    );

    // Verificar que cada card tiene todos los elementos requeridos
    cy.get('[data-test-id="metric-card"]')
      .first()
      .within(() => {
        // Verificar contenedor principal
        cy.get('[data-test-id="metric-card-container"]').should('be.visible');

        // Verificar título
        cy.get('[data-test-id="metric-title-container"]').should('be.visible');
        cy.get('[data-test-id="metric-title"]').should('be.visible');

        // Verificar valor
        cy.get('[data-test-id="metric-value-container"]').should('be.visible');
        cy.get('[data-test-id="metric-value"]').should('be.visible');

        // Verificar porcentaje
        cy.get('[data-test-id="metric-percentage-container"]').should(
          'be.visible',
        );
        cy.get('[data-test-id="metric-percentage-change"]').should(
          'be.visible',
        );
        cy.get('[data-test-id="metric-percentage-icon"]').should('be.visible');
        cy.get('[data-test-id="metric-percentage-value"]').should('be.visible');

        // Verificar descripción
        cy.get('[data-test-id="metric-description-container"]').should(
          'be.visible',
        );
        cy.get('[data-test-id="metric-description"]').should('be.visible');
      });
  });
});
