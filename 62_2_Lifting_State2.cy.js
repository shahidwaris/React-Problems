describe("Parent and Child Component interaction", () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })
    it("displays the typed input value in the Parent Component", () => {
      const typedValue = "hello world";
      cy.get(".child input[type='text']").type(typedValue);
      cy.get(".parent").contains(typedValue);
    });
  
    it("updates the Child Component input value when the Parent Component input value changes", () => {
      const typedValue = "Avengers Assemble!!!";
      cy.get(".child input[type='text']").type(typedValue);
      cy.get(".child input[type='text']").should("have.value", typedValue);
    });
  });
