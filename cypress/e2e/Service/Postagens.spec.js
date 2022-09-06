/// <reference types="cypress" />

describe('Testes de Criação de Postagens', () => {

    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });


    it('[POST] - Criar um mensagem', () => {
        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
            body: {
                "text": "Postagem pelo cypress"
            }
        }
        ).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
});

describe('Testes de consulta', () => {

    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });


    it('[GET] - Consultar uma postagem', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.empty
            expect(response).to.have.property('headers')
            // expect(response.body).to.contains("TesteHelbert")
            // expect(response.body[0].text).to.eq("Teste de postagem")
            // expect(response.body[0].user).to.eq("62ff6b429b6552001528dcda")
            console.log(response.body);
        })
    });


    it('[GET] - Consultar uma postagem por Id', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookie: token
            }
        }
        ).then((response) => {
            expect(response.status).to.eq(200)
        })
    })


    it('[GET] - Consultar uma postagem por Id', () => {
        cy.criarPostagem(token, "PostagemID").then((response) => {
            let id = response.body._id;
            cy.request({
                method: 'GET',
                url: `/api/posts/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
});


describe('Teste de exclusão', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[DELETE] - Deletar uma postagem por Id', () => {
        cy.criarPostagem(token, "PostagemID").then((response) => {
            let id = response.body._id;
            cy.request({
                method: 'DELETE',
                url: `/api/posts/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Post removido")
            })
        })
    })
});

describe('Curtir um post', () => {
    let token;

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it.only('[PUT] - Curtir um post por ID', () => {
        cy.criarPostagem(token, "PostagemID").then((response) => {
            let id = response.body._id;
            cy.request({
                method: 'PUT',
                url: `/api/posts/like/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.not.empty
                expect(response).to.have.property('headers')
                console.log(response.body);
            })
        })
    })
});
