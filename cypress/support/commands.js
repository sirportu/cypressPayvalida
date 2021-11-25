// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('sqlServerTriton', (query) => {
    if(!query) {
      throw new Error('Query must be set');
    }

    cy.task('sqlServerTriton', query).then(response => {
      let result = [];

      const flatten = r => Array.isArray(r) && r.length === 1 ? flatten(r[0]) : r;

      if(response) {
        for (let i in response) {
          result[i] = [];
          for (let c in response[i]) {
            result[i][c] = response[i][c].value;
          }
        }
        result = flatten(result);
      } else {
        result = response;
      }

      return result;
    });
});

Cypress.Commands.add('sqlServer', (query) => {
    if(!query) {
      throw new Error('Query must be set');
    }

    cy.task('sqlServer', query).then(response => {
      let result = [];

      const flatten = r => Array.isArray(r) && r.length === 1 ? flatten(r[0]) : r;

      if(response) {
        for (let i in response) {
          result[i] = [];
          for (let c in response[i]) {
            result[i][c] = response[i][c].value;
          }
        }
        result = flatten(result);
      } else {
        result = response;
      }

      return result;
    });
});