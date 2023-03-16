/// <reference types="cypress"/>

describe('Online Mobile Store',()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/');
    })

    it('url changes when click on products',()=>{
        cy.get('a[href="/products/1"]').click()
        cy.url().should('include','products/1')
        cy.get('.btn').click()
        cy.url().should('include','/')
        cy.get('a[href="/products/5"]').click()
        cy.url().should('include','products/5')
        cy.get('.btn').click()
        cy.url().should('include','/')
    })

    it('Navigating to admin and removing products',()=>{
        cy.get(':nth-child(2) > a').click()
        cy.wait(1000)
        cy.get('div.col-12>div>a').should('have.length','8')
        cy.get('button').click()
        cy.get(':nth-child(1) > :nth-child(1) > .form-control').type('Samsung Galaxy Z Fold3 5G')
        cy.get(':nth-child(2) > .form-control').type('The Samsung Galaxy Z Fold 3 is the companys most ambitious, productivity-centric smartphone yet. This third-generation model feels more refined thanks to improvements such as an IPX8 rating and S Pen support')
        cy.get('.col-sm-10 > .form-control').type('https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71MmJNwZcML._SX425_.jpg')
        cy.get('.col-sm-4 > .form-control').type('120000')
        cy.get('button').click()
        cy.get('div.col-12>div>a').should('have.length','9')
        cy.get(':nth-child(9) > a > .row > .ProductLink_titleAdmin__xKnPd').contains('Samsung Galaxy Z Fold3 5G')
        cy.get('.Header_main-nav__scpsF > :nth-child(1) > a').click()
        cy.get('div.col-12').should('have.length','9')
    })

    it('Removes/update a product',()=>{
        cy.get(':nth-child(2) > a').click()
        cy.get(':nth-child(4) > a > .row').click()
        cy.get('.col-sm-4 > .form-control').clear().type(49999)
        cy.get(':nth-child(3) > .float-right').click()
        cy.get('.Header_main-nav__scpsF > :nth-child(1) > a').click()
        cy.get('div[class="col-6 col-sm-6"]')
        .contains('49999')
        cy.get(':nth-child(2) > a').click()
        cy.get(':nth-child(2) > :nth-child(7)').click()
        cy.get(':nth-child(2) > .float-right').click()
        cy.get('div.col-12>div>a').should('have.length','7')
    })
})
