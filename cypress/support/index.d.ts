/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    waitForAngular(): Chainable<void>;
    shouldHaveClass(className: string): Chainable<Element>;
    shouldContainText(text: string): Chainable<Element>;
  }
}
