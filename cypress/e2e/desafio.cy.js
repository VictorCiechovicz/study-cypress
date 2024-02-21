/// <reference types="cypress"/>

describe('Desafio', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.reload()
  })

  it('Alert', () => {
    cy.get('#formCadastrar').click()
    cy.on('window:alert', msg => {
      if (msg === 'Nome eh obrigatorio') {
        cy.get('#formNome').focus().type('Victor')
      }
    })

    cy.get('#formCadastrar').click()
    cy.on('window:alert', msg => {
      if (msg === 'Sobrenome eh obrigatorio') {
        cy.get('#formSobrenome').focus().type('Avila')
      }
    })

    cy.get('#formCadastrar').click()
    cy.on('window:alert', msg => {
      if (msg === 'Sexo eh obrigatorio') {
        cy.get('#formSexoMasc').click().should('be.checked')
      }
    })
    cy.get('#formCadastrar').click()
    cy.contains('span', 'Cadastrado!')
  })
})
