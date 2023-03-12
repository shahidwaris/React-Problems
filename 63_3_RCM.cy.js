describe('Modal Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should not render when show is false', () => {
      cy.get('.modal-overlay').should('not.exist');
    });
  
    it('should render when show is true', () => {
      cy.get('button').click();
      cy.get('.modal-overlay').should('exist');
    });
  
    it('should close when Close button is clicked', () => {
      cy.get('button').click();
      cy.get('.modal-close').click();
      cy.get('.modal-overlay').should('not.exist');
    });
  
    it('should close when clicking outside of modal', () => {
      cy.get('button').click();
      cy.get('.modal-overlay').click('topRight');
      cy.get('.modal-overlay').should('not.exist');
    });
  
    it('should render children', () => {
      cy.get('button').click();
      cy.get('.modal p').should('contain.text', 'This is the content of the modal.');
    });
  });
