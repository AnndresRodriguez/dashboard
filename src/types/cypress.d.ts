/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for Angular to be ready
       * @example cy.waitForAngular()
       */
      waitForAngular(): Chainable<void>;

      /**
       * Custom command to check if element has specific class
       * @example cy.get('.element').shouldHaveClass('active')
       */
      shouldHaveClass(className: string): Chainable<Element>;

      /**
       * Custom command to check if element contains text
       * @example cy.get('.element').shouldContainText('Hello World')
       */
      shouldContainText(text: string): Chainable<Element>;
    }
  }
}

export {};
