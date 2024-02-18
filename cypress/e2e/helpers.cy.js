/// <reference types="cypress"/>

describe('Helpers', () => {
  it('Wrap', () => {
    const obj = { name: 'user', age: 12 }
    expect(obj).to.have.property('name')
    cy.wrap(obj).should('have.property', 'name')

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#formNome').then($el => {
      $el.val('funciona via cypress')
    })
  })

  it('Its', () => {
    const obj = { name: 'user', age: 12 }
    expect(obj).to.have.property('name')
    cy.wrap(obj).should('have.property', 'name')
    cy.wrap(obj).its('name').should('be.equal', 'user')

    const obj2 = { name: 'user', age: 12, address: { street: 'alvorada' } }
    cy.wrap(obj2).its('address').its('street').should('contain', 'alvorada')
    //ou
    cy.wrap(obj2).its('address.street').should('contain', 'alvorada')

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.title().its('length').should('be.equal', 20)
  })
})

it('Invoke', () => {
  const soma = (a, b) => a + b
  cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7) //invoco a funcao soma e depois passo os parametros para ele e verifico qual foi o resultado

  cy.visit('https://wcaquino.me/cypress/componentes.html')
  cy.get('#formNome').invoke('val', 'Texto vai invoke') //envia o value para este formulario e escreve algo
})
