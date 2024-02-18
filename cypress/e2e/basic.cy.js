/// <reference types="cypress"/>

describe('Cypress basic', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  it('Should visit a page and assert title', () => {
    cy.title().should('be.equal', 'Campo de Treinamento')

    cy.title().then(title => {
      console.log(title)
    }) //captura de um valor dentro de uma pagina, neste caso foi o title da pagina
  })
})
