import App from '../../src/App' 
/// <reference types="Cypress" />

describe('Realtime-error-feed.cy.jsx', () => {
  beforeEach('playground', () => {
    cy.mount(<App/>)
    
  })

  //checks if the form is rendered or not.
  it('should render the form', () => {
    cy.get('form').should('be.visible') 
  }) 

  //checks whether the error message is displayed when the name field is left empty.
  it('should require name', () => {
    cy.get('#name').type(' ').clear() 
    cy.get('.error-message').should('be.visible') 
  }) 

  //checks whether the error message is displayed when an invalid email is entered.
  it('should require valid email', () => {
    cy.get('#email').type('invalid email') 
    cy.get('.error-message').contains('Invalid email format') 
  }) 

  //checks whether the error message is displayed when the password field is left empty.
  it('should require password', () => {
    cy.get('#password').type(' ').clear()
    cy.get('.error-message').should('be.visible') 
  }) 

  //checks whether the error message is displayed when the password is less than 6 characters long.
  it('should require password to be at least 6 characters', () => {
    cy.get('#password').type('12345') 
    cy.get('.error-message').should('be.visible')
  }) 

  //checks whether the form is submitted successfully when valid data is entered.
  it('should submit the form with valid data', () => {
    cy.get('#name').type('John') 
    cy.get('#email').type('john@example.com') 
    cy.get('#password').type('password123') 
    cy.get('form').submit() 
})
})
