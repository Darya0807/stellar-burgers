/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    setAuthToken(): Chainable<void>;
    clearAuthToken(): Chainable<void>;
  }
}

Cypress.Commands.add('setAuthToken', () => {
  cy.setCookie('accessToken', 'Bearer test-access-token');
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'test-refresh-token');
  });
});

Cypress.Commands.add('clearAuthToken', () => {
  cy.clearCookie('accessToken');
  cy.window().then((win) => {
    win.localStorage.removeItem('refreshToken');
  });
});
