describe('App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })
  
    it('displays the initial mouse position', () => {
      cy.contains('The mouse position is: , ')
    })
  
    it('updates the mouse position on mousemove', () => {
      cy.get('body')
        .trigger('mousemove', { clientX: 100, clientY: 200 })
      cy.contains('The mouse position is: 100, 200')
    })
  
    it('stops updating the mouse position on unmount', () => {
      cy.get('body')
        .trigger('mousemove', { clientX: 100, clientY: 200 })
      cy.contains('The mouse position is: 100, 200')
  
      cy.reload()
  
      cy.contains('The mouse position is: , ')
      cy.get('body')
        .trigger('mousemove', { clientX: 300, clientY: 400 })
      cy.contains('The mouse position is: 300, 400')
    })
  })
  
