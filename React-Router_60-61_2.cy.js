describe('App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
    });
  
    it('should display the item list', () => {
      cy.contains('h1', 'Item List');
      cy.get('li').should('have.length', 3);
    });
  
    it('should navigate to item detail page', () => {
      cy.contains('Item 1').click();
      cy.contains('h1', 'Item 1');
      cy.contains('p', 'Description for Item 1');
    });
  
    it('should display correct item information', () => {
      cy.contains('Item 2').click();
      cy.contains('h1', 'Item 2');
      cy.contains('p', 'Description for Item 2');
      cy.visit('http://localhost:5173');
      cy.contains('Item 3').click();
      cy.contains('h1', 'Item 3');
      cy.contains('p', 'Description for Item 3');
    });
  
  });
