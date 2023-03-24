/// <reference types="cypress"/>

describe("Kanban Dashboard",()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000');
    })

    it('Checking if app is getting render',()=>{
        cy.get('h1').contains('Kanban')
        cy.get('div.card').should('exist')
        cy.get('div.card>.card-header').should('exist')
        cy.get('div.card>.card-body').should('exist')
    })

    it('checking if task can be added to backlog',()=>{
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2)>.card').should('have.length','2')
        cy.get('.btn-block').click()
        cy.get(':nth-child(3) > .card-body > .p-3').clear().type('Task 5')
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2)>.card').should('have.length','3')
    })

    it('adding tasks to todo inprogress and done status',()=>{
        cy.get('.btn-block').click()
        cy.get(':nth-child(3) > .card-body > .p-3').clear().type('Task 5')
        cy.get('.btn-block').click()
        cy.get(':nth-child(4) > .card-body > .p-3').clear().type('Task 6')

        const dataTransfer = new DataTransfer();
   
        cy.get('.mt-5 > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)>.card-header').trigger('dragstart', {
            dataTransfer
        });
    
        cy.get('.mt-5 > :nth-child(2) > :nth-child(1) > .card-body').trigger('drop', {
            dataTransfer
        });

        cy.get('.mt-5 > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)').trigger('dragend')

    })
})
