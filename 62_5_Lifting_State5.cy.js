describe("Login form", () => {
    it("Allows user to login", () => {
      cy.visit("http://localhost:5173/");
      cy.contains("h1", "Parent Component");
      cy.get("form").within(() => {
        cy.get('input[id="username"]').type("john_doe");
        cy.get('input[id="password"]').type("password123");
        cy.get('button').click();
      });
      cy.contains("p", "You are logged in!");
    });
  });
