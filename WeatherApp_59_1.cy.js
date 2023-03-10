
describe("App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("should display the search input", () => {
      cy.get(".search").should("be.visible");
    });
  
    it("should display weather information for a valid city entered in the search input", () => {
      cy.get(".search").type("New York{enter}");
      cy.wait(2000); // wait for API call to complete
      cy.get(".weather").should("be.visible");
    });
  
    it("should not able to enter if invalid city name is passed", () => {
      cy.get(".search").type("Invalid City{enter}").addTestContext('Invalid City');
    });
  
    it("should clear the search input after a valid city is entered", () => {
      cy.get(".search").type("New York{enter}");
      cy.wait(2000); // wait for API call to complete
      cy.get(".search").should("have.value", "");
    });
  });
  
