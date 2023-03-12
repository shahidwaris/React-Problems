describe('Tooltip Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should not show tooltip on mouse leave', () => {
        cy.get('.tooltiptext').should('not.exist');
    });
  
    it('should show tooltip on mouse enter', () => {
      cy.get('h2.tooltip > div').trigger('mouseover');
      cy.get('h2.tooltip > div > div').should('exist');
    });
  
    it('should hide tooltip on mouse leave', () => {
      cy.get('p.tooltip > div').trigger('mouseover');
      cy.get('p.tooltip div').trigger('mouseleave');
      cy.get('[data-layer="Content"]').should('not.exist');
    });
  
    it('should show different tooltip text for different elements', () => {
      cy.get('h2').trigger('mouseover');
      cy.get('h2.tooltip').should('contain.text', 'This is a tooltip');
      cy.get('p').trigger('mouseover');
      cy.get('p.tooltip').should('contain.text', 'This is another tooltip');
    });
  });
