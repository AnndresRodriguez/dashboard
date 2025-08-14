/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to wait for Angular to be ready
Cypress.Commands.add('waitForAngular', () => {
  cy.window().then((win) => {
    // Wait for Angular to be ready
    cy.wrap(win).its('ng').should('exist');
  });
});

// Custom command to check if element has specific class
Cypress.Commands.add(
  'shouldHaveClass',
  { prevSubject: 'element' },
  (subject, className) => {
    cy.wrap(subject).should('have.class', className);
  },
);

// Custom command to check if element contains text
Cypress.Commands.add(
  'shouldContainText',
  { prevSubject: 'element' },
  (subject, text) => {
    cy.wrap(subject).should('contain.text', text);
  },
);
