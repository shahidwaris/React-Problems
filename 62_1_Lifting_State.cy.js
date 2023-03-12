describe('App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should render Parent Component', () => {
      cy.get('.parent').should('be.visible');
      cy.get('h1').should('contain.text', 'Parent Component');
    });
  
    it('should show modal when button is clicked', () => {
      cy.get('button').click();
      cy.get('h3').should('contain.text', 'Modal Content');
      cy.get('p').should('contain.text', 'This is the modal content.');
    });
  });
