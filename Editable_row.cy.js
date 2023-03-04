import App from '../../src/App' 
/// <reference types="Cypress" />


describe('EditableTable component', () => {
    beforeEach(() => {
        cy.mount(<App/>);
    })
      it("displays initial data", () => {
        const data = [
          { id: 1, name: "Ram", age: 25 },
          { id: 2, name: "Shyam", age: 30 },
          { id: 3, name: "Ali", age: 35 },
          { id: 4, name: "Shaw", age: 20 },
          { id: 5, name: "Tavneet", age: 50 },
          { id: 6, name: "Lakshmi", age: 40 },
        ];
        
        cy.get("tbody tr")
          .should("have.length", 6)
          .each(($row, index) => {
            const { id, name, age } = data[index];
            cy.wrap($row).find("td").eq(0).should("have.text", id.toString());
            cy.wrap($row).find("td").eq(1).find("input").should("have.value", name);
            cy.wrap($row).find("td").eq(2).find("input").should("have.value", age);
          });
      });
      
      //Checking if it allows editing a single cell
      it("allows editing a cell", () => {
        cy.get("tbody tr").eq(1).find("td").eq(1).find("input").type("{selectall}{backspace}").type("Updated Name");
        cy.get("tbody tr").eq(1).find("td").eq(1).find("input").should("have.value", "Updated Name");
      });
      
      //Checking if it allows editing multiple cells
      it("allows editing multiple cells", () => {
        cy.get("tbody tr").eq(2).find("td").eq(1).find("input").type("{selectall}{backspace}").type("New Name");
        cy.get("tbody tr").eq(2).find("td").eq(2).find("input").type("{selectall}{backspace}").type("99");
        cy.get("tbody tr").eq(2).find("td").eq(1).find("input").should("have.value", "New Name");
        cy.get("tbody tr").eq(2).find("td").eq(2).find("input").should("have.value", "99");
      });
      
      //Checking that it should log edited rows to console after submitting
      it("should log edited rows to console after submitting form", () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'log').as('consoleLog');
          });

        // Edit the table data
        cy.get("tbody tr:first-child input[type='text']").clear().type("New name");
        cy.get("tbody tr:first-child input[type='number']").clear().type(99);
        cy.get("tbody tr:last-child input[type='text']").clear().type("Another name");
        cy.get("tbody tr:last-child input[type='number']").clear().type(50);
    
        // Submit the form
        cy.get("form").submit();
    
        // Check that the edited rows were logged to the console
        cy.window().its("console.log").should("be.calledWith", "Edited rows:", [1,6]);
      });
      
  })
