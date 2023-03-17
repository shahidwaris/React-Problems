/// <reference types="cypress"/>
describe('Shopping cart', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    it('Checking if app renders successfully',()=>{
        cy.get('.navbar-expand-lg > .text-center').contains('Shopping Cart')
        cy.get('#root > :nth-child(2) > :nth-child(1) > h3').contains('All Products')
        cy.get('.custom-card').should('exist')
        cy.get(':nth-child(2) > h3').contains('Wishlists')
        cy.get('.col-lg-8 > .custom-card').should('exist')
        cy.get('h4').contains('Cart ( 0 Items)')
        cy.get('.col-lg-4 > .custom-card').should('exist')
        cy.get('.custom-card > h5').contains('The Total Amount Of')
    })

    it("should add a product to the cart", () => {
        // select the first "Add To Cart" button and click it
        cy.get(".custom-card.card button.btn-primary")
          .first()
          .click()
          .then(() => {
            // check if the cart count has increased
            cy.get(".custom-card h4")
              .invoke("text")
              .then((text) => {
                const cartCount = Number(text.match(/\d+/)[0]);
                expect(cartCount).to.eq(1);
              });
    
            // check if the product has been added to the cart items list
            cy.get(".custom-card .row").should("have.length", 1);
          });
      });
    
      it("should remove a product from the cart", () => {
        cy.get(".custom-card.card button.btn-primary").last().click().then(() => {
            // check if the cart count has increased
            cy.get(".custom-card h4").invoke("text").then((text) => {
                const cartCount = Number(text.match(/\d+/)[0]);
                expect(cartCount).to.eq(1);
              });
            cy.get(".custom-card .row").should("have.length", 1);
          });
        // click the "Remove" button on the first cart item
        cy.get(':nth-child(1) > .MuiButton-label').first().click().then(() => {
            // check if the cart count has decreased
            cy.get(".custom-card h4")
              .invoke("text")
              .then((text) => {
                const cartCount = Number(text.match(/\d+/)[0]);
                expect(cartCount).to.eq(0);
              });
    
            // check if the product has been removed from the cart items list
            cy.get(".custom-card .cart-item").should("not.exist");
          });
      });
    
      it("should increase the quantity of a product in the cart", () => {
        // click the "+" button on the first cart item
        cy.get(':nth-child(2) > .custom-card > .card-body > .btn').click()
        cy.get('.input-group-append > .btn').first().click()
          .then(() => {
            // check if the cart total has increased
            cy.get(".custom-card strong").last().invoke("text")
              .then((text) => {
                const cartTotal = Number(text.match(/\d+\.?\d*/)[0]);
                expect(cartTotal).to.be.greaterThan(0);
              });
    
            // check if the quantity of the product has increased
            cy.get('.input-group > .form-control').should('have.value','2')
          });
      });
    
      it("should decrease the quantity of a product in the cart", () => {
        // click the "-" button on the first cart item
        cy.get(':nth-child(3) > .custom-card > .card-body > .btn').click()
        cy.get('.input-group-append > .btn').click()
        cy.get('.input-group-prepend > .btn')
          .eq(0)
          .click()
          .then(() => {
            // check if the cart total has decreased
            cy.get(".custom-card strong")
              .last()
              .invoke("text")
              .then((text) => {
                const cartTotal = Number(text.match(/\d+\.?\d*/)[0]);
                expect(cartTotal).to.be.lessThan(1700); // assuming the product price is less than 10
              });
    
            // check if the quantity of the product has decreased
            cy.get('.input-group > .form-control').should('have.value','1')
          });
      });

      it("should add a product to the wishlist", () => {

        cy.get(':nth-child(4) > .custom-card > .card-body > .btn').click()
        // click the "Add to Wishlist" button on the product page
        cy.get('.ml-2 > .MuiButton-label').click();
        
        // assert that the product has been added to the wishlist
        cy.get('#root > :nth-child(2) > :nth-child(2) > .row').should("have.length", 1);
        cy.get('#root > :nth-child(2) > :nth-child(2) > .row').eq(0).contains("Black Chino Pants");
      });
      
      it("should remove a product from the wishlist", () => {
        cy.get(':nth-child(2) > .custom-card > .card-body > .btn').click()
        // click the "Add to Wishlist" button on the product page
        cy.get('.ml-2 > .MuiButton-label').click();
      
        // go to the wishlist and remove the product
        cy.get(':nth-child(2) > .row > .col-md-3 > .custom-card > .card-body > .btn').click();
      
        // assert that the product has been removed from the wishlist
        cy.get('#root > :nth-child(2) > :nth-child(2) > .row').contains('Your wishlist is empty');
      });
    
    });
