import App from '../../src/App' 
/// <reference types="Cypress" />

describe('App', () => {
    beforeEach(() => {
      cy.mount(<App/>);
    });

// Checking that it should render the form fields
    it('should render the form fields', () => {
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="age"]').should('exist');
    });
  
    //Checking that it should add form fields
    it('should add form fields', () => {
      cy.get('button').contains('Add More..').click();
      cy.get('input[name="name"]').last().should('exist');
      cy.get('input[name="age"]').last().should('exist');
    });
  
    //Checking that it should remove form fields
    it('should remove form fields', () => {
      cy.get('button').contains('Add More..').click();
      cy.get('button').contains('Remove').last().click();
      cy.get('input[name="name"]').should('have.length', 1);
      cy.get('input[name="age"]').should('have.length', 1);
    });

    //Checking that it should submit form data
    it('should submit form data', () => {
      cy.get('button').contains('Add More..').click()
      cy.get(':nth-child(1) > [name="name"]').type('Ravi');
      cy.get(':nth-child(1) > [name="age"]').type('40');
      cy.get(':nth-child(2) > [name="name"]').type('John');
      cy.get(':nth-child(2) > [name="age"]').type('25');
      cy.get('button').contains('Submit').click();
      cy.window().its('console').invoke('log', [{ name: 'Ravi', age: '40' }]);
      cy.window().its('console').invoke('log', [{ name: 'John', age: '25' }]);
    });
    
    //Checking that it should log form data on submit
      it('should log form data on submit', () => {
        const spy = cy.spy(console, 'log');
        cy.get('button').contains('Add More..').click()
        cy.get(':nth-child(1) > [name="name"]').type('Ravi');
        cy.get(':nth-child(1) > [name="age"]').type('40');
        cy.get(':nth-child(2) > [name="name"]').type('John');
        cy.get(':nth-child(2) > [name="age"]').type('25');
        
        cy.get('button').contains('Submit').click();
      
        cy.wrap(spy).should('have.been.called', [{ name: 'Ravi', age: '40' }]);
        cy.wrap(spy).should('have.been.called', [{ name: 'John', age: '25' }]);
      });

      //Checking that it should update the form data with new details
      it('should update the form data', () => {
        const spy = cy.spy(console, 'log');

        cy.get(':nth-child(1) > [name="name"]').type('John');
        cy.get(':nth-child(1) > [name="age"]').type('25');
        cy.get('button').contains('Submit').click();
        cy.wrap(spy).should('have.been.called', [{ name: 'John', age: '25' }]);

        cy.get(':nth-child(1) > [name="name"]').clear().type('Alex');
        cy.get(':nth-child(1) > [name="age"]').clear().type('32');
        cy.get('button').contains('Submit').click();
        cy.wrap(spy).should('have.been.called', [{ name: 'Alex', age: '32' }]);
      });
    
  });
  
  
