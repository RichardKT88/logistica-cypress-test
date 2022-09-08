/// <reference types="cypress" />

describe('US0003 - Funcionalidade: Perfil', () => {
    
    beforeEach(() => {
        cy.visit('login')
        
       
        
    });
    //Cenário Positivo
    it.only('Deve criar perfil com sucesso e SEM redes sociais', () => {
        cy.login('email@email.com', 'pass123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Teste')
        
        cy.get('[data-test="dashboard-createProfile"]').should('have.text', 'Criar Perfil').then(() => {
            cy.get('[data-test="dashboard-createProfile"]').click()
        })        
         cy.profile('QA Júnior', 'VIA', 'https://viavarejo.com.br', 'São Paulo, SP', 'Testes de Integração, Automação de Testes, Cypress, Testes Manuais', '',  'Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Copo furadis é disculpa de bebadis, arcu quam euismod magna.Viva Forevis aptent taciti sociosqu ad litora torquent.Quem num gosta di mim que vai caçá sua turmis!')      
        cy.get('[data-test="navbar-logout"]').click()
        
    });

    it('Deve criar perfil com sucesso e COM redes sociais', () => {
        cy.login('email@email.com', 'pass123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Teste')

        cy.get('[data-test="dashboard-createProfile"]').should('have.text', 'Criar Perfil').then(() => {
            cy.get('[data-test="dashboard-createProfile"]').click()
        })  
        cy.profile('QA Pleno', 'VIA', 'https://viavarejo.com.br', 'Sorocaba, SP', 'Testes de Integração, Automação de Testes, Cypress, Testes Manuais', 'https://github.com/RichardKT88',  'Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi!Paisis, filhis, espiritis santis.Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.', 'https://twitter.com', 'https://facebook.com', 'https://youtube.com', 'https://linkedin.com', 'https://instagram.com', 'https://medium.com')

        cy.get('[data-test="navbar-logout"]').click()      
        
    });

    it('Deve atualizar perfil com sucesso e SEM redes sociais', () => {
        cy.login('email@email.com', 'pass123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Teste')
        
        cy.get('[data-test="dashboard-editProfile"]').should('have.text', ' Editar Perfil').then(() => {
            cy.get('[data-test="dashboard-editProfile"]').click()
        })        
        cy.profileClear()
         cy.profile('QA Júnior', 'VIA', 'https://viavarejo.com.br', 'São Paulo, SP', 'Testes de Integração, Automação de Testes, Cypress, Testes Manuais', '',  'Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Copo furadis é disculpa de bebadis, arcu quam euismod magna.Viva Forevis aptent taciti sociosqu ad litora torquent.Quem num gosta di mim que vai caçá sua turmis!')      
        cy.get('[data-test="navbar-logout"]').click()
        
    });

  
    it('Deve atualizar perfil com sucesso e COM redes sociais', () => {
        cy.login('email@email.com', 'pass123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Teste')

        cy.get('[data-test="dashboard-editProfile"]').should('have.text', ' Editar Perfil').then(() => {
            cy.get('[data-test="dashboard-editProfile"]').click()
        })      
        cy.profileClear()
        cy.profile('QA Pleno', 'VIA', 'https://viavarejo.com.br', 'Sorocaba, SP', 'Testes de Integração, Automação de Testes, Cypress, Testes Manuais', 'https://github.com/RichardKT88',  'Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi!Paisis, filhis, espiritis santis.Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.', 'https://twitter.com', 'https://facebook.com', 'https://youtube.com', 'https://linkedin.com', 'https://instagram.com', 'https://medium.com')

        cy.get('[data-test="navbar-logout"]').click()      
        
    });
   

    //Cenário Negativo
    it('Validar mensagem de campos obrigatórios quando não preenchidos', () => {
        cy.login('email@email.com', 'pass123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Teste')
        cy.get('[data-test="dashboard-editProfile"]').should('have.text', ' Editar Perfil').then(() => {
            cy.get('[data-test="dashboard-editProfile"]').click()
        })
        cy.profileClear()
  
        cy.profile('Gerente de Testes', 'VIA', 'https://viavarejo.com.br', 'Sorocaba, SP', '', 'https://github.com/RichardKT88',  'Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi!Paisis, filhis, espiritis santis.Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.', 'https://twitter.com', 'https://facebook.com', 'https://youtube.com', 'https://linkedin.com', 'https://instagram.com', 'https://medium.com')
        cy.get('.MuiFormHelperText-root').should('contain', 'Conhecimentos é obrigatório')
    });
    
});