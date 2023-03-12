describe('Tabs Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should render tabs with titles and contents', () => {
      cy.get('li').should('have.length', 3);
      cy.get('li').eq(0).should('contain.text', 'Tab 1');
      cy.get('li').eq(1).should('contain.text', 'Tab 2');
      cy.get('li').eq(2).should('contain.text', 'Tab 3');
      cy.get('div').should('contain.text', 'This is the content for Tab 1.');
    });
  
    it('should switch active tab on click', () => {
      cy.get('li').eq(1).click();
      cy.get('div').should('contain.text', 'This is the content for Tab 2.');
      cy.get('li').eq(2).click();
      cy.get('div').should('contain.text', 'This is the content for Tab 3.');
    });
  });
  
