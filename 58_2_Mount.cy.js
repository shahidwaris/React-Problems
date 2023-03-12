describe("MyComponent", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
      });

    it('should fetch data from API when mounted', () => {
        cy.intercept('https://jsonplaceholder.typicode.com/posts').as('getPosts')
        cy.visit('http://localhost:5173/');
        cy.wait('@getPosts').its('response.statusCode').should('eq', 200)
      })
    
    it("displays the correct title and body of each item returned from API", () => {
      cy.intercept("https://jsonplaceholder.typicode.com/posts").as("fetchPosts");
      cy.wait("@fetchPosts").its("response.statusCode").should("eq", 200);
  
        cy.get("h2").should("have.length", 100);
        cy.get("p").should("have.length", 100);
  
        cy.get("h2").first().should("have.text", "1. sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
        cy.get("p").first().contains("quia et suscipit suscipit");
  
        cy.get("h2").last().should("have.text", "100. at nam consequatur ea labore ea harum");
        cy.get("p").last().contains("cupiditate quo est a modi nesciunt soluta ipsa");
    });
    
    it('should not refetch data when re-rendered', () => {
        cy.intercept('https://jsonplaceholder.typicode.com/posts').as('getPosts')
        cy.visit('http://localhost:5173/');
        cy.wait('@getPosts').its('response.statusCode').should('eq', 200)
        cy.reload()
        cy.wait('@getPosts', { timeout: 0 }).should(({ request }) => {
          expect(request).not.to.have.property('response')
        })
      })
  
  });
