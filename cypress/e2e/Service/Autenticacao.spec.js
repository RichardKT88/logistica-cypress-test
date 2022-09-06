/// <reference types="cypress" />

import auth from '../../fixtures/auth.json'

describe('Testes de Autenticação', () => {
    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[POST] - Teste de autenticação', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            failOnStatusCode: false,
            body: auth
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.not.empty
            expect(response.body).to.have.property('jwt')
            expect(response).to.have.property('headers')
            expect(response).to.have.property('duration')
            console.log(response.body);
            cy.log(response.body)
            cy.getCookies('conexaoqa.herokuapp.com').should('exist')
        })
    });

    it('[GET] - Verificar Usuário Logado com variavel tempo de execução', () => {
        let token2
        cy.tokenJwt().then((auth) => {
            token2 = auth
        })
        cy.request({
            method: 'GET',
            url: 'api/auth',
            headers: {
                Cookies: token2
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body);
            cy.log(response.body)
        })
    })

    it('[GET] - Verificar Usuário Logado com variavel Global', () => {

        cy.request({
            method: 'GET',
            url: 'api/auth',
            headers: {
                Cookies: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body);
            cy.log(response.body)
        })
    })
});

