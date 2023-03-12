describe("Tabs", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173");
    });
  
    it("should display the default tab", () => {
      cy.contains("Content for Tab 1").should("be.visible");
    });
  
    it("should switch to the second tab", () => {
      cy.contains("Tab 2").click();
      cy.contains("Content for Tab 1").should("not.exist");
      cy.contains("Content for Tab 2").should("be.visible");
    });
  
    it("should switch to the third tab", () => {
      cy.contains("Tab 3").click();
      cy.contains("Content for Tab 1").should("not.exist");
      cy.contains("Content for Tab 3").should("be.visible");
    });
  
    it("should switch to the first tab of the second set of tabs", () => {
      cy.contains("Tab A").click();
      cy.get(".tabs").eq(1).contains("Content for Tab A").should("be.visible");
      cy.get(".tabs").eq(1).contains("Content for Tab C").should("not.exist");
  
      cy.contains("Tab C").click();
      cy.get(".tabs").eq(1).contains("Content for Tab A").should("not.exist");
      cy.get(".tabs").eq(1).contains("Content for Tab C").should("be.visible");
  
      cy.contains("Tab A").click();
      cy.get(".tabs").eq(1).contains("Content for Tab A").should("be.visible");
      cy.get(".tabs").eq(1).contains("Content for Tab C").should("not.exist");
    });
  });
  
