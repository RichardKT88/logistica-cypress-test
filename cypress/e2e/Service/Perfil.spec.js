/// <reference types="cypress" />

describe('Teste de Consulta de Perfil', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[GET] - Seleciona o perfil de usuário logado', () => {
        cy.request({
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('[GET] - Seleciona todos os perfis cadastrados', () => {
        cy.request({
            method: 'GET',
            url: '/api/profile',
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('[GET] - Seleciona o perfil do usuário pelo ID', () => {
        cy.usuarioLogado(token).then((response) => {
            let id = response.body.user._id;
            cy.request({
                method: 'GET',
                url: `/api/profile/user/${id}`,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

    });
    it.only('[GET] - Seleciona os repositórios do GitHub pelo nome do usuário', () => {
        cy.usuarioLogado(token).then((response) => {
            let gitHubUsername = response.body.githubusername;
            cy.request({
                method: 'GET',
                url: `/api/profile/github/${gitHubUsername}`,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

    });

});

describe('Teste de criação/atualização de perfil', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[POST] - Criar/Atualizar perfil', () => {
        cy.request({
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: {
                "company": "VIA",
                "status": "QA Senior",
                "location": "Ribeirão Preto",
                "website": "www.site.com.br",
                "skills": "Lorem ipsum",
                "bio": "Mussum ipsum",
                "githubusername": "loki99",
                "youtube": "www.youtube.com",
                "twitter": "www.twitter.com",
                "facebook": "www.facebook.com",
                "linkedin": "www.linkedin.com",
                "instagram": "www.instagram.com",
                "medium": "www.medium.com"
            }
        }
        ).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

});

describe('Teste', () => {
    
});