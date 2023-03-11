describe('App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('renders an Autocomplete component with suggestions', () => {
      cy.get('input').should('exist');
      cy.get('input').type('a');
      cy.get('li').should('exist');
    });
  
    it('filters suggestions as the user types', () => {
      cy.get('input')
        .type('aj')
        .should('have.value', 'aj')
        .get('li')
        .should('have.length', 3)
        .eq(1)
        .should('contain', 'Ajmer')
        .next()
        .should('contain', 'Sangli Miraj Kupwad')
    cy.get('input').clear()
        .type('hyd')
        .should('have.value', 'hyd')
        .get('li')
        .should('have.length', 1)
        .should('contain', 'Hyderabad');
    });
  
    it('selects a suggestion when clicked', () => {
      cy.get('input')
        .type('mumbai')
        .get('li')
        .contains('Mumbai')
        .click()
    cy.get('input').should('have.value', 'Mumbai');
    });
  });
  
