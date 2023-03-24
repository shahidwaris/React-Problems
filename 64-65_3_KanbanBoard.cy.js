/// <reference types="cypress"/>

describe("Kanban Dashboard",()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000');
    })

    it('Checking if app is getting render',()=>{
        cy.get('.status-column').should('exist')
        cy.get('.status-column > .task').should('exist')
    })

    it('Move task from Backlog to TODO and vice versa',()=>{
        cy.get(':nth-child(1) > .status-column > .task').should('exist')
        cy.get(':nth-child(1) > .status-column > .task > button').click()
        cy.get(':nth-child(1) > .status-column > .task').should('not.exist')
        cy.get(':nth-child(2) > .status-column > :nth-child(2) > p').contains('Task 1')
        cy.get('.status-column > :nth-child(3) > button').contains('Backlog').click()
    })

    it('Move tasks from TODO Inprogress state',()=>{
        cy.get(':nth-child(2) > .status-column > .task > button').contains('In Progress').click()
        cy.get(':nth-child(3) > .status-column > :nth-child(2) > p').contains('Task 2')
        cy.get(':nth-child(2) > .status-column > .task').should('not.exist')
        cy.get('.status-column > :nth-child(3) > button').contains('Todo').click()
        cy.get(':nth-child(2) > .status-column > .task').should('exist')
    })

    it('Move tasks from In progress to completed',()=>{
        cy.get(':nth-child(3) > .status-column > .task > button').contains('Completed').click()
        cy.get(':nth-child(3) > .status-column > .task').should('not.exist')
        cy.get(':nth-child(4) > .status-column > :nth-child(2) > p').contains('Task 3')
        cy.get('.status-column > :nth-child(3) > button').contains('In Progress').click()
        cy.get(':nth-child(3) > .status-column > .task').should('exist')
    })

    it('Moving task from backlog to completed',()=>{
        cy.get(':nth-child(1) > .status-column > .task > button').click()
        cy.get(':nth-child(2) > .status-column > :nth-child(2) > p').contains('Task 1')
        cy.get(':nth-child(2) > .status-column > :nth-child(2) > button').contains('In Progress').click()
        cy.get(':nth-child(3) > .status-column > :nth-child(2) > p').contains('Task 1')
        cy.get(':nth-child(3) > .status-column > :nth-child(2) > button').contains('Completed').click()
        cy.get(':nth-child(4) > .status-column > :nth-child(2) > p').contains('Task 1')
    })
    
})
