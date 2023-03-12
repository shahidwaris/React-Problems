describe("Todo App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("should mark a todo as completed when the complete button is clicked", () => {
      cy.get("li > button").eq(0).should("exist");
      cy.contains("Complete").click();
      cy.get('li:first-child button').should('not.exist');
      cy.get("li > button").eq(1).should("exist");
      cy.contains("Complete").click();
      cy.get('ul > :nth-child(3) button').should('not.exist');
      cy.get("li > button").eq(0).should("exist");
      cy.contains("Complete").click();
      cy.get('li:last-child button').should('not.exist');
    });
  });
  
