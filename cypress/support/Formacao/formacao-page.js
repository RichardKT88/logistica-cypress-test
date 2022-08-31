class FormacaoPage {

    get #escola() {return cy.get('[data-test="education-school"]')} 
    get #grau() {return cy.get('[data-test="education-degree"]')} 
    get #curso() {return cy.get('[data-test="education-fieldOfStudy"]')} 
    get #dataInicio() {return cy.get('[data-test="education-from"]')} 
    get #dataFim() {return cy.get('[data-test="education-to"]')} 
    get #descricao() {return cy.get('[data-test="education-description"]')} 
    get #btnAdd() {return cy.get('[data-test="education-submit"]')} 
    get #checkAtual() {return cy.get('[name="current"]')}

    addFormacao(escola, grau, curso, dataInicio, dataFim, descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataInicio.type(dataInicio)
        this.#dataFim.type(dataFim)
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }
    addFormacaoCursando(escola, grau, curso, dataInicio, descricao) {
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataInicio.type(dataInicio)
        this.#checkAtual.check()
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }

}

module.exports = new FormacaoPage()