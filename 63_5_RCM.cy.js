describe("Form", () => {
    it("should submit the form with the entered data", () => { 
      cy.visit("http://localhost:5173/");

      cy.window().then((win) => {
        cy.stub(win.console, 'log').as('consoleLog');
      });
      cy.get("input[name='name']").type("Steve Rogers");
      cy.get("input[name='email']").type("captain.america@avengers.com");
      cy.get("input[name='password']").type("ilovetonystark");
      cy.get("form").submit();
      
      cy.wait(1000)
      cy.get('@consoleLog').should('have.been.calledWithMatch', {
              name: "Steve Rogers",
              email: "captain.america@avengers.com",
              password: "ilovetonystark"
            });
    });
  });
