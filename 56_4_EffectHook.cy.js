describe("Form component", () => {

    beforeEach(()=>{
        cy.visit("http://localhost:3000/");
    })

    it("renders the form and input element correctly", () => {
      cy.get("form").should("exist");
      cy.get("input[type='text']").should("exist");
    });
  
    it("updates the input value when typing", () => {
      cy.get("input[type='text']").type("Hello World").should("have.value", "Hello World");
    });

    it("should log value changes to console", () => {
        const input = cy.get("input");
        input.type("Hello World!").should("have.value", "Hello World!");
        cy.log("value changed: Hello World!");
      });
  });
  
