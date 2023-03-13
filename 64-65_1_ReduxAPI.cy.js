describe('App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('renders the app header', () => {
      cy.contains('h1', 'User Information');
    });
  
    it('renders the input fields', () => {
      cy.get('input[type="text"]').should('exist');
      cy.get('input[type="email"]').should('exist');
    });
  
    it('updates the name field', () => {
      const name = 'Thomas Edward Stark';
      cy.get('input[type="text"]').type(name).should('have.value', name);
    });
  
    it('updates the email field', () => {
      const email = 'tonystark@starkindustries.com';
      cy.get('input[type="email"]').type(email).should('have.value', email);
    });
  
    it('displays the updated values in the output', () => {
      const name = 'Thomas Edward Stark';
      const email = 'tonystark@starkindustries.com';
      cy.get('input[type="text"]').type(name);
      cy.get('input[type="email"]').type(email);
      cy.get('.output').contains(`Name - ${name}`);
      cy.get('.output').contains(`Email - ${email}`);
    });
  });
  
