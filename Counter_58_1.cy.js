import App from "../../src/App"

describe("Counter component", () => {
    beforeEach(() => {
      cy.mount(<App />);
    });
    
    //Verify that initial count value is 0
    it("displays initial count value of 0", () => {
      cy.get("p").contains("Count: 0").should("exist");
    });
  
    //Verify that count is incremented by 1 every time + is clicked
    it("increments count when + button is clicked", () => {
      cy.get("button").click();
      cy.get("p").contains("Count: 1").should("exist");
    });
  
    //Verify that calculation updates everytime count is incremented
    it("updates calculation value when count is incremented", () => {
      cy.get("button").click();
      cy.get("p").contains("Calculation: 2").should("exist");
    });
  });
  
