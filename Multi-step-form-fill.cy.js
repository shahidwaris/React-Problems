import App from '../../src/App' 
import '../../src/index.css'
import '../../src/App.css'
/// <reference types="Cypress" />

describe('Multi-Step Form', () => {
    beforeEach(() => {
      cy.mount(<App/>);
    });
  
    //Checks if it renders the first step with correct fields
    it('renders the first step with correct fields', () => {
      cy.get('h3').should('contain', 'Customer Details');
      cy.get('label').should('contain', 'First Name:');
      cy.get('label').should('contain', 'Last Name:');
      cy.get('button').should('contain', 'Next');
    });
  
    //Checks if it can fill out the first step and move to the second step
    it('can fill out the first step and move to the second step', () => {
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('button').contains('Next').click();
  
      cy.get('h3').should('contain', 'Car Details');
      cy.get('label').should('contain', 'Brand:');
      cy.get('label').should('contain', 'Model:');
      cy.get('button').should('contain', 'Previous');
      cy.get('button').should('contain', 'Next');
    });
  
    //Checks if can fill out the second step and move to the third steppassed
    it('can fill out the second step and move to the third step', () => {
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('button').contains('Next').click();
  
      cy.get('input[name="make"]').type('Toyota');
      cy.get('input[name="model"]').type('Camry');
      cy.get('button').contains('Next').click();
  
      cy.get('h3').should('contain', 'Payment Details');
      cy.get('label').should('contain', 'Credit Card Number:');
      cy.get('label').should('contain', 'Expiration Date:');
      cy.get('button').should('contain', 'Previous');
      cy.get('button').should('contain', 'Submit');
    });
  
    //Checks if it can go back to the first step and edit the inputs
    it('can go back to the first step and edit the inputs', () => {
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('button').contains('Next').click();
  
      cy.get('input[name="make"]').type('Toyota');
      cy.get('input[name="model"]').type('Camry');
      cy.get('button').contains('Previous').click();
  
      cy.get('h3').should('contain', 'Customer Details');
      cy.get('input[name="firstName"]').should('have.value', 'John');
      cy.get('input[name="lastName"]').should('have.value', 'Doe');
    });
  
    //Checks if it shows an error message if the credit card number is not 12 digits long
    it('shows an error message if the credit card number is not 12 digits long', () => {
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('button').contains('Next').click()
        cy.get('input[name="make"]').type('Honda');
        cy.get('input[name="model"]').type('Civic');
        cy.get('button').contains('Next').click()
        cy.get('input[name="creditCardNumber"]').type('1234567890123');
        cy.get('input[name="expirationDate"]').type('05/24');
        cy.get('button').contains('Submit').click();
    
        cy.contains('Credit card number must be exactly 12 digits long.').should('be.visible');
    });

    //Checks if it shows an error message if the expiration date is not in the correct format
    it('shows an error message if the expiration date is not in the correct format', () => {
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('button').contains('Next').click()
        cy.get('input[name="make"]').type('Honda');
        cy.get('input[name="model"]').type('Civic');
        cy.get('button').contains('Next').click()
        cy.get('input[name="creditCardNumber"]').type('123456789012');
        cy.get('input[name="expirationDate"]').type('12/434');
        cy.get('button').contains('Submit').click();
        cy.get('.error').contains('Expiration date must be in the format MM/YY.');
      });

      //Checks if it can fill out the entire form and submit it
      it('can fill out the entire form and submit it', () => {

        cy.window().then((win) => {
            cy.stub(win.console, 'log').as('consoleLog');
          });

      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('button').contains('Next').click();
  
      cy.get('input[name="make"]').type('Toyota');
      cy.get('input[name="model"]').type('Camry');
      cy.get('button').contains('Next').click();
  
      cy.get('input[name="creditCardNumber"]').type('123456789012');
      cy.get('input[name="expirationDate"]').type('12/23');
      cy.get('button').contains('Submit').click();
  
      cy.get('@consoleLog').should('have.been.calledWithMatch', {
        firstName: 'John',
        lastName: 'Doe',
        make: 'Toyota',
        model: 'Camry',
        creditCardNumber: '123456789012',
        expirationDate: '12/23'
      });
})

});
  
