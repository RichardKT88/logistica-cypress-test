/// <reference types="Cypress" />

import auth from '../fixtures/auth.json'

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => {
    cy.visit('login')
    cy.get('[data-test="login-email"]').type(email)
    cy.get('[data-test="login-password"]').type(password)
    cy.get('[data-test="login-submit"]').click()
}
)
Cypress.Commands.add("register", (name, email, password) => {
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="register-submit"]').click()
}
)
Cypress.Commands.add("profile", (status, company, webSite, location, skills, gitHub, bio, twitter, facebook, youtube, linkedin, instagram, medium) => {
    cy.get('#mui-component-select-status').click()
    cy.get('#mui-component-select-status').should('have.value', '')
    cy.get('.MuiMenuItem-root').each(($ele) => {
        if ($ele.text() == status) {
            cy.wrap($ele).click()
        }
    })
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(company)
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(webSite)
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(location)
    if (gitHub.length > 0 && skills.length === 0) {
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(gitHub)
        cy.get('[data-test="profile-bio"]').type(bio)
        cy.get('[data-test="profile-socials"]').click()
        cy.get('[data-test="profile-twitter"]').type(twitter)
        cy.get('[data-test="profile-facebook"]').type(facebook)
        cy.get('[data-test="profile-youtube"]').type(youtube)
        cy.get('[data-test="profile-linkedin"]').type(linkedin)
        cy.get('[data-test="profile-instagram"]').type(instagram)
        cy.get('[data-test="profile-medium"]').type(medium)
        cy.get('[data-test="profile-submit"]').click()
    } else {
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(skills)
        cy.get('[data-test="profile-bio"]').type(bio)
        cy.get('[data-test="profile-submit"]').click()
    }

})

Cypress.Commands.add("profileClear", () => {
    cy.get('#mui-component-select-status').click()
    cy.get('#mui-component-select-status').should('have.value', '')
    cy.get('.MuiMenuItem-root').each(($ele) => {
        if ($ele.text() == 'Outro') {
            cy.wrap($ele).click()
        }
    })
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').clear()
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').clear()
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').clear()
    cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').clear()
    cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').clear()
    cy.get('[data-test="profile-bio"]').clear()
    cy.get('[data-test="profile-socials"]').click()
    cy.get('[data-test="profile-twitter"]').clear()
    cy.get('[data-test="profile-facebook"]').clear()
    cy.get('[data-test="profile-youtube"]').clear()
    cy.get('[data-test="profile-linkedin"]').clear()
    cy.get('[data-test="profile-instagram"]').clear()
    cy.get('[data-test="profile-medium"]').clear()
    cy.get('[data-test="profile-socials"]').click()
})

Cypress.Commands.add("tokenJwt", () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add("criarPostagem", (token, texto) => {
    cy.request({
        method: 'POST',
        url: '/api/posts',
        headers: {
            Cookie: token
        },
        body: {
            text: texto
        }
    })
})

Cypress.Commands.add("usuarioLogado", (token) => {
    cy.request({
        method: 'GET',
        url: '/api/profile/me',
        headers: {
            Cookie: token
        }    
    })
})

Cypress.Commands.add("criarUsuario", (name, email, password) => {
    cy.request({
        method: 'POST',
        url: '/api/users',
        body: {
            name: name,
            email: email,
            password: password  
        }
    })
})