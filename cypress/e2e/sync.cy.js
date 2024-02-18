/// <reference types="cypress"/>

describe('Wait....', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.reload()
  })

  it('Waiting element', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona')
  })

  it('Retrys', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist').type('funciona')
  })

  it('Using comand find()', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li').find('span').should('contain', 'Item 1') //o find() realiza um busca em um escopo mais reduzido
    cy.get('#lista li span').should('contain', 'Item 2')
  })

  it('Timeout', () => {
    cy.get('#buttonListDOM').click()
    cy.wait(5000) //esepra fixa, para nesta etapa por 5s e depois continua
    cy.get('#lista li span', { timeout: 5000 }).should('contain', 'Item 2') //timeout dento do get faz com que ele fique até conseguir, mas se conseguir antes do tempo é continuado a teste
  })

  it('Should vs Then', () => {
    //1-diferenca entre should e then é que o should fica sendo executado até o comando ser concluido ja o then é executado depois que o get é concluido
    //2-o should possui return ja o then nao possui return
    //3-para realizacao de novas buscas dentro de um bloco apenas o should nao é muito bom para ser utilizando e sim o then
    cy.get('#buttonListDOM').click()

    cy.get('#lista li span').should($item => {
      //.should('have.lenght',1)
      expect($item).to.have.length(1) //verifica se a listagem possui 1 item
    })
    cy.get('#lista li span').then($item => {
      //.should('have.lenght',1)
      expect($item).to.have.length(1) //verifica se a listagem possui 1 item
      console.log($item)
    })
  })
})
