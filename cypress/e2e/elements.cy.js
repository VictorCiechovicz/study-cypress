/// <reference types="cypress"/>

describe('Work with basic elements', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.reload()
  })

  afterEach(() => {
    console.log('runs after each test block')
  })

  it('Text', () => {
    cy.get('body').should('contain', 'Cuidado onde clica, muitas armadilhas...')
    cy.get('span').should('contain', 'Cuidado onde clica, muitas armadilhas...')
    cy.get('.facilAchar').should(
      'contain',
      'Cuidado onde clica, muitas armadilhas...'
    )
    cy.get('.facilAchar').should(
      'have.text',
      'Cuidado onde clica, muitas armadilhas...'
    )
  })

  it('Links', () => {
    cy.get('a').click()
    cy.get('#resultado').should('have.text', 'Voltou!')

    cy.get('#resultado').should('have.text', 'Voltou!')
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text', 'Voltou!')
  })

  it('TextFields', () => {
    cy.get('#formNome')
      .type('Cypress', { delay: 100 }) //delay na hora da escrita
      .should('have.value', 'Cypress') /// verifica se o value do input depois de digitado

    cy.get('#elementosForm\\:sugestoes')
      .type('Cypress', { delay: 100 })
      .should('have.value', 'Cypress')
  })

  it('Radio Button', () => {
    cy.get('#formSexoFem').click().should('be.checked')
    cy.get('#formSexoMasc').should('not.be.checked')

    cy.get('[name=formSexo]').should('have.length', 2)
  })

  it('Checkbox', () => {
    cy.get('#formComidaVegetariana').click().should('be.checked')
    cy.get('[name=formComidaFavorita]').click({ multiple: true }) //marcar todos os checkbox
    cy.get('#formComidaVegetariana').should('not.be.checked')
  })

  it('Combo', () => {
    cy.get('#formEscolaridade')
      .select('1o grau completo')
      .should('have.value', '1graucomp')

    cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)

    cy.get('[data-test=dataEscolaridade] option').then($array => {
      const values = []
      $array.each(function () {
        values.push(this.innerHTML)
      })

      expect(values).to.include.members(['Superior', 'Mestrado'])
    })
  })

  it.only('Combo Multiple', () => {
    cy.get('#formEsportes')
      .select(['Natacao', 'Futebol', 'Corrida']) //forma de selecao de multiplas opcoes
      .should('have.value', 'natacao')

    cy.get('[data-testid=dataEsportes]').then($el => {
      expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
      expect($el.val()).to.have.length(3)

      cy.get('[data-testid=dataEsportes]')
        .invoke('val')
        .should('eql', ['natacao', 'Corrida', 'nada'])
    })
  })
})
