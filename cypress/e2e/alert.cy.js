/// <reference types="cypress"/>

describe('Alert', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.reload()
  })

  it('Alert', () => {
    cy.get('#alert').click()
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Alert Simples')
    })
  })

  it('Alert with mock', () => {
    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)

    cy.get('#alert')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
      })
  })

  it('Confirm', () => {
    cy.get('#confirm').click()
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Confirmado')
    })
  })

  it('Deny', () => {
    cy.get('#confirm').click()
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
      return false
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Confirmado')
    })
  })

  it('Prompt', () => {
    cy.get('#prompt').click()
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('42')
    })

    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Era 42?')
      return false
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal(':D')
    })
  })
})
