describe('MyComponent', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('renders a list of posts', () => {
      cy.intercept('https://jsonplaceholder.typicode.com/posts').as('getPosts')
  
      cy.get('p').contains('Loading...')
  
      cy.wait('@getPosts').then((interception) => {
        expect(interception.response.body).to.have.length.greaterThan(0)
      })
  
      cy.contains('h4', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
      cy.contains('p', 'doloremque ex facilis sit sint culpa soluta assumenda eligendi non ut eius sequi ducimus vel quasi veritatis est dolores')
    })
  })
  
