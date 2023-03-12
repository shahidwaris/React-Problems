describe("MyComponent", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
      });

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
  
  });
