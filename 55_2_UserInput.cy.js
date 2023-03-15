describe('UserForm', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('displays an error message when the name field is invalid', () => {
      cy.get('input[type="text"]').eq(0).type('123');
      cy.get('form').submit();
      cy.get('form > :nth-child(1) > div').should('contain', 'Name should contain only letters');
    });
  
    it('displays an error message when the email field is invalid', () => {
      cy.get('input[type="text"]').eq(2).type('test@example');
      cy.get('form').submit();
      cy.get('div').eq(6).should('contain', 'Email should contain @ and .com');
    });
  
    it('displays an error message when the mobile field is too long', () => {
      cy.get('input[type="text"]').eq(3).type('12345678901');
      cy.get('form').submit();
      cy.get('div').eq(7).should('contain', 'Mobile number should not be more than 10 characters');
    });
  
    it('submits the form successfully when all fields are valid', () => {
      cy.get('input[type="text"]').eq(0).type('John Doe');
      cy.get('input[type="text"]').eq(1).type('123 Main St');
      cy.get('input[type="text"]').eq(2).type('john.doe@example.com');
      cy.get('input[type="text"]').eq(3).type('555-555-5555');
      cy.get('form').submit();
      cy.contains('Submit');
    });
  });
  
