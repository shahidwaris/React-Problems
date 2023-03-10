describe("SearchBar", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("should display the search bar", () => {
      cy.get("form").should("be.visible");
      cy.get("input[type='text']").should("be.visible");
      cy.get("button[type='submit']").should("be.visible");
    });
  
    it("should display search results when a valid search term is entered", () => {
      cy.get("input[type='text']").type("evil dead");
      cy.get("button[type='submit']").click();
      cy.get("li").should("have.length", 10);
      cy.get("li").each(($el) => {
        cy.wrap($el).should("contain.text", "Evil Dead");
        cy.wrap($el).find("img").should("have.attr", "src").should("include", "http");
      });
    });
  
    it("should display an error message when an invalid search term is entered", () => {
      cy.get("input[type='text']").type("invalidsearchterm");
      cy.get("button[type='submit']").click();
      cy.get("li").should("not.exist");
      cy.get(".error").should("contain.text", "Invalid movie name. Please try again.");
    });
  });
  
