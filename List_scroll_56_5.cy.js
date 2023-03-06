import List from "../../src/components/List";
/// <reference types="Cypress" />

describe('List Scroll', () => {
    beforeEach(() => {
      cy.mount(<List/>);
    });

    //Verify that the component displays the correct number of items
    it('displays 10 items by default', () => {
        cy.get('[style="height: 500px; overflow: auto;"]');
        cy.wait(1000);
        cy.get('h2').should('have.length', 10);
      });

      //Verify that the component updates the displayed items when scrolled
      it('displays the next set of items when scrolled', () => {
        cy.get('h2').last().scrollIntoView();
        cy.wait(1000); // Wait for the component to update
        cy.get('h2').should('have.length', 10);
        cy.get('p').should('have.length', 10);
      });

      //Verify that the component displays the correct item text
      it('displays the correct item text', () => {
        cy.get('h2').first().should('contain', 'Item 0');
        cy.get('p').first().should('contain', 'Lorem ipsum dolor sit amet.');
      });

      //Verify that the component updates the item height correctly
      it('updates the item height when scrolled', () => {
        cy.get('h2').last().scrollIntoView();
        cy.wait(1000); // Wait for the component to update
        cy.get('h2').first().then(($item) => {
          const itemHeight = $item.outerHeight();
          cy.wrap(itemHeight).as('itemHeight');
        });
        cy.get('@itemHeight').should((height) => {
          expect(height).to.be.greaterThan(0);
        });
      });

});
