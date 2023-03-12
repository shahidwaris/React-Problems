describe('PageLayout Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should render header, children, and footer', () => {
      cy.get('h1').should('contain.text', 'Welcome to my website');
      cy.get('p').should('contain.text', 'This is the content of my website.');
      cy.get('div').contains('© 2023 My Website. All rights reserved.');
    });
  
    it('should pass header, children, and footer as props', () => {
      cy.get('h1').should('exist');
      cy.get('p').should('exist');
      cy.get('div').contains('© 2023 My Website. All rights reserved.');
    });
  });
