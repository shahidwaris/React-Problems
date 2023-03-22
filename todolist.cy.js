describe("Todo List App", () => {

    beforeEach(()=>{
        cy.visit("http://localhost:3000/");
    })

    it("renders the app correctly", () => {
      cy.contains("All");
      cy.contains("Active");
      cy.contains("Completed");
      cy.get('input[type="checkbox"]').should("not.be.checked");
      cy.contains("Todo 1");
    });
  
    it("can switch between tabs", () => {
      cy.get("li").should("have.length", 50);
      cy.contains("Active").click();
      cy.get("li").should("have.length", 25);
      cy.contains("Completed").click();
      cy.get("li").should("have.length", 25);
      cy.contains("All").click();
      cy.get("li").should("have.length", 50);
    });
});
