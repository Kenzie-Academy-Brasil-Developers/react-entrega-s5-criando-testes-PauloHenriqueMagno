const { cpSync } = require("fs");

context("E2etest", () => {
    it("Type a valid CEP and get an address", () => {
        cy.visit("http://localhost:3000");
        cy.viewport(1440, 900);

        cy.intercept("get", "/", {
            statusCode: 200
        });

        cy.get('input').type('08032008');
        cy.get('button').click();
        
        cy.get('form').contains('Logradouro');
        cy.get('form').contains('Número');
        cy.get('form').contains('Complemento');
        cy.get('form').contains('Bairro');
        cy.get('form').contains('Cidade');
        cy.get('form').contains('Estado');
    });
});