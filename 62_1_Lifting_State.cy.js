describe('Shopping Cart App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })
  
    it('should render parent component and child component', () => {
      cy.get('.parent').should('exist')
      cy.get('.child').should('exist')
    })
  
    it('should add item to cart on button click', () => {
      cy.get('#itemName').type('Item 4')
      cy.get('#itemPrice').type('40')
      cy.get('button').contains('Add Item').click()
      cy.get('.child').contains('Item 4 - $40').should('exist')
    })
  
    it('should remove item from cart on button click', () => {
      cy.get('.child li').last().find('button').click()
      cy.get('.child').contains('Item 3 - $30').should('not.exist')
    })
  })
  
