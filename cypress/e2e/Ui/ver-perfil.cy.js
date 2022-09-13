/// <reference types="cypress" />

import mockPerfil from '../../fixtures/profile.json'

describe('Funcionalidade: Visualização dos perfis', () => {
    
    beforeEach(() => {
        cy.visit('perfis')
        cy.intercept({
            method: 'GET',
            url: 'api/profile'
        },{
            statusCode: 200,
            //body: mockPerfil
            fixture: "profile"
        })
        cy.reload()
    });
    
    it.only('Validar o primeiro item da lista', () => {        
        cy.get('[data-test="profile-name"]').first().should('contain', 'Jalahm Bipal')       

    });

    it.only('Validar lista vazia', () => {
        cy.intercept('api/profile', {statusCode: 404})
        cy.reload()
        cy.get('[data-test="profiles-noProfiles"]').should('contain', 'Nenhum perfil encontrado')
    });

    it('Validar o último item da lista', () => {
        cy.get('[data-test="profile-name"]').last().should('contain', 'Roberto dos Santos')

    });

    it('Validar o terceiro item da lista', () => {
        cy.get('[data-test="profile-name"]').eq(2).should('contain', 'Pa Sun')

    });
});