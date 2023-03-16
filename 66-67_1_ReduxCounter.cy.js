describe("App", () => {

    beforeEach(()=>{
        cy.visit("http://localhost:3000/");
    })

    it('renders the app and intialises with 0',()=>{
        cy.get('h1').should('have.text','0')
        cy.get('div > :nth-child(2)').contains('increment')
        cy.get('div > :nth-child(3)').contains('decrease')
    })

    it('increase count on clicking increment & decrease on clicking decrease',()=>{
        cy.get('div > :nth-child(2)').click().click()
        .get('h1').contains('2')
        cy.get('div > :nth-child(3)').click().click().click()
        .get('h1').contains('-1')
    })
  });
  
