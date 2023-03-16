describe("App", () => {

    beforeEach(()=>{
        cy.visit("http://localhost:3000/");
    })

    it("should display the login page when not authenticated", () => {
      cy.visit("/");
      cy.contains("You are not authenticated, Please login first");
      cy.get(':nth-child(1) > a').contains('Playground').should("not.exist");
      cy.contains("Login").click();
      cy.url().should("include", "/login");
    });
  
    it("should allow the user to log in", () => {
      cy.get(':nth-child(2) > a').click()  
      cy.contains("Log In").click();
      cy.contains("Log Out")
      cy.contains("Logged in, Now you can enter Playground");
      cy.contains("PlayGround").click();
      cy.get('.main-container > :nth-child(3)').contains('Hi Welcome to Code PlayGround')
    });
  
    it("should redirect to login page when accessing protected route without authentication", () => {
      cy.visit("/home");
      cy.url().should("include", "/login");
    });
  
    it("should not display the Playground when logged out", () => {
        cy.get(':nth-child(2) > a').click()  
        cy.get(':nth-child(2) > a').click()
        cy.get('button').click()
        cy.contains("Logged in, Now you can enter Playground");
        cy.contains("PlayGround").click();
        cy.get('.main-container > :nth-child(3)').contains('Hi Welcome to Code PlayGround')
        cy.get(':nth-child(2) > a').click()
        cy.get('button').click()
        cy.get('.main-container > :nth-child(1)').contains('You are not authenticated, Please login first')
    });
  });
  
