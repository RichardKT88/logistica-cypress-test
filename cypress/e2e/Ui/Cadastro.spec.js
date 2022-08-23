/// <reference types="cypress" />

const faker = require('faker-br')

describe('US0002 - Funcionalidade: Cadastro', () => {
  
    beforeEach(() => { //Faz o visit antes de cada cenário
        cy.visit('cadastrar')
        
    });
    
    it('Deve fazer cadastro com sucesso', () => {        
        cy.register('Richard Kendy', 'email@email.com', 'raj123', 'raj123');
        //Resultado esperado
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-createProfile"]').should('exist')
    });
});

/* 
antes de tudo 
before

antes de cada cenário
beforeEach

depois de tudo 
after

depois de cada cenário
afterEach
*/