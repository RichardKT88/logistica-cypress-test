/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"
describe('US001 - Funcionalidade: Login', () => {
    
    beforeEach(() => {
        cy.visit('login')
        
    });

    it('Deve fazer login com sucesso', () => {
        cy.login('kendysan@gmail.com', 'Cmepso60')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Richard Kendy')
    });

    it('Validar mensagem de erro quando inserir usuário ou senha inválidos', () => {
        cy.login('kendysan2@gmail.com', 'Cmepso60')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });

    it('Deve fazer login com sucesso - Usando importação', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.title().should('eq', 'ConexaoQA')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[1].email, user[1].senha)
        })
        cy.title().should('eq', 'ConexaoQA')
    });

    /*it.only('Validar mensagem de erro quando inserir usuário ou senha inválidos', () => {
        cy.login('kendysan2@gmail.com', 'Cmepso60')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });*/
});

/*
    Funcionalidade: Login
    Eu como usuário da conexão QA
    Quero Fazer Login
    Para editar o meu perfil
    
    Cenário: Login com sucesso
    Arrange - Dado - Pré-requisito --> Dado que eu esteja na tela de login
    Action - Quando - Ação do usuário --> Quando eu inserir usuário e senha
    Assert - Então - Resultado esperado --> Então deve me direcionar para o Dashboard
    
    Esquema do cenário
    Quando eu inserir <usuario>
    E <senha>
    Então
    
    Exemplos:
    | usuario | senha |
    | "fabio@bootcamp.com" | "teste@123" |
    | "ana@via.com"

    Cenário: Validar msg de erro
    Cenário: Recuperar senha    
    
*/