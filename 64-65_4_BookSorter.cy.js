describe('BooksList', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
    });
  
    it('should render the header with title "Books List"', () => {
      cy.get('h1').should('have.text', 'Books List');
    });
  
    it('should render the "sort by" dropdown', () => {
      cy.get('label').contains('Sort by:').should('exist');
      cy.get(':nth-child(1) > select').should('exist');
      cy.get(':nth-child(1) > select option').should('have.length', 3);
      cy.get(':nth-child(1) > select option').eq(0).should('have.text', 'Title');
      cy.get(':nth-child(1) > select option').eq(1).should('have.text', 'Author');
      cy.get(':nth-child(1) > select option').eq(2).should('have.text', 'Publisher');
    });
  
    it('should render the "order" dropdown', () => {
      cy.get('label').contains('Order:').should('exist');
      cy.get(':nth-child(2) > select').should('exist');
      cy.get(':nth-child(2) > select option').should('have.length', 2);
      cy.get(':nth-child(2) > select option').eq(0).should('have.text', 'Ascending');
      cy.get(':nth-child(2) > select option').eq(1).should('have.text', 'Descending');
    });
  
    it('should render the table with book data', () => {
      cy.get('table').should('exist');
      cy.get('table th').should('have.length', 4);
      cy.get('table th').eq(0).should('have.text', 'Title');
      cy.get('table th').eq(1).should('have.text', 'Author');
      cy.get('table th').eq(2).should('have.text', 'Publisher');
      cy.get('table th').eq(3).should('have.text', 'ISBN');
      cy.get('table td').should('have.length', 60);
    });
  
    it('should render the book data in sorted order by title by default', () => {
      cy.get('table td').eq(0).should('have.text', 'A DAY OF FALLEN NIGHT');
      cy.get('table td').eq(1).should('have.text', 'Samantha Shannon');
      cy.get('table td').eq(2).should('have.text', 'Bloomsbury');
      cy.get('table td').eq(3).should('have.text', '1635577926');
      cy.get(':nth-child(1) > select').select('Author');
      cy.get('table td').eq(0).should('have.text', 'THE HOUSE IN THE PINES');
      cy.get('table td').eq(1).should('have.text', 'Ana Reyes');
      cy.get('table td').eq(2).should('have.text', 'Dutton');
      cy.get('table td').eq(3).should('have.text', '0593186710');
    });
})
