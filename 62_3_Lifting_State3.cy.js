describe('App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should render Parent Component', () => {
      cy.get('.parent').should('be.visible');
      cy.get('h1').should('contain.text', 'Parent Component');
    });
  
    it('should select Option 1', () => {
      cy.get('button').contains('Option 1').click();
      cy.get('p').should('contain.text', 'Selected Option: Option 1');
    });
  
    it('should select Option 2', () => {
      cy.get('button').contains('Option 2').click();
      cy.get('p').should('contain.text', 'Selected Option: Option 2');
    });
  });
