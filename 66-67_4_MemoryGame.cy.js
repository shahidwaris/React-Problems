/// <reference types="cypress"/>

describe('Memory game', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    it('Renders the game',()=>{
        cy.get('h5').contains('Welcome!')
        cy.get('.sc-bxivhb > div').should('exist')
        cy.get('button').should('exist')
})

    it('Validating different modes',()=>{
        //Easy Mode
        cy.get('#easy').check()
        cy.get('button').click()
        cy.get('h4').contains('0')
        cy.get('div.sc-bwzfXH').should('have.length','8')
        cy.get(':nth-child(3) > :nth-child(1)').click().get(':nth-child(3) > :nth-child(1) > span')
        .should('exist')
        cy.get(':nth-child(4) > :nth-child(2)').click()
        cy.get(':nth-child(4) > :nth-child(2)').click().get(':nth-child(4) > :nth-child(2) > span')
        .should('exist')
        cy.get('h4').contains('1')

        cy.visit('http://localhost:3000/')

        //Normal Mode
        cy.get('#normal').check()
        cy.get('button').click()
        cy.get('h4').contains('0')
        cy.get('div.sc-bwzfXH').should('have.length','16')
        cy.get(':nth-child(3) > :nth-child(1)').click().get(':nth-child(3) > :nth-child(1) > span')
        .should('exist')
        cy.get(':nth-child(5) > :nth-child(3)').click()
        cy.get(':nth-child(5) > :nth-child(3)').click().get(':nth-child(5) > :nth-child(3) > span')
        .should('exist')
        cy.get('h4').contains('1')

        cy.visit('http://localhost:3000/')

        //Hard Mode
        cy.get('#hard').check()
        cy.get('button').click()
        cy.get('h4').contains('0')
        cy.get('div.sc-bwzfXH').should('have.length','24')
        cy.get(':nth-child(3) > :nth-child(1)').click().get(':nth-child(3) > :nth-child(1) > span')
        .should('exist')
        cy.get(':nth-child(5) > :nth-child(3)').click()
        cy.get(':nth-child(5) > :nth-child(3)').click().get(':nth-child(5) > :nth-child(3) > span')
        .should('exist')
        cy.get(':nth-child(5) > :nth-child(1)').click()
        cy.get('h4').contains('3')
    })

})
