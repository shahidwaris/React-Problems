import App from '../../src/App' 
/// <reference types="Cypress" />

describe('Authentication component', () => {
    beforeEach(() => {
      cy.mount(<App/>) 
    })
  
    //Testing to display a message that user is not authenticated initially
    it('displays a message that user is not authenticated initially', () => {
      cy.get('p').should('contain', 'you are not authenticated')
    })
  
    //Testing to display authenticated message when checkbox is clicked
    it('displays authenticated message when checkbox is clicked', () => {
      cy.get('input[type="checkbox"]').click()
      cy.get('.authText').should('contain', 'You are now authenticated')
    })

    
  })
