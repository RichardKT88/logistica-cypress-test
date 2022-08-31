/// <reference types="cypress" />
const formacaoPage = require('../../support/Formacao/formacao-page')

describe('Funcionalidade: Adicionar formação acadêmica', () => {
    beforeEach(() => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[1].email, user[1].senha)
        })
        cy.visit('adicionar-formacao')
    });

    it('Deve adicionar uma formação acadêmica com sucesso', () => {
        formacaoPage.addFormacao('FAPOP', 'Ensino Superior', 'Ciência de Dados', '01/01/2020', '01/01/2025', 'Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.')
        cy.get('[data-test="education-delete"]').should('exist')
    });

    it('Deve adicionar uma formação acadêmica Atual com sucesso', () => {
        formacaoPage.addFormacaoCursando('CEPAL', 'MBA', 'Gêmeos digitais', '01/01/2020','Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.')
        cy.get('[data-test="education-delete"]').should('exist')
    });

    it('Deve excluir uma experiência com sucesso', () => {
        cy.get('[data-test="education-dashboard"]').click()
        cy.get('[data-test="education-delete"]').first().click()
        cy.contains('Formação Acadêmica Removida').should('be.visible')
    });

    it('Validar mensagem de campos obrigatórios quando não preenchidos', () => {
        cy.get('[data-test="education-submit"]').click()
        cy.get('.MuiFormHelperText-root').should('contain', 'Escola é obrigatória')
        cy.get('.MuiFormHelperText-root').should('contain', 'Grau é obrigatório')
        cy.get('.MuiFormHelperText-root').should('contain', 'Curso é obrigatório')
        cy.get('.MuiFormHelperText-root').should('contain', 'Início é obrigatório')
        cy.get('.MuiFormHelperText-root').should('contain', 'Até é obrigatório')
    });
});