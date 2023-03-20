/// <reference types="cypress"/>
describe('Shopping cart', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    it('should display the app title', () => {
        cy.get('h1').contains('GenZ')
        cy.get('.App > :nth-child(1)').should('exist')
        cy.get('.posts-list').should('exist')
      })
    
    it('Validate buttons & url',()=>{
        cy.get('a').contains('Posts').click()
        cy.url().should('contains','/')
        cy.get('a').contains('Users').click()
        cy.url().should('contains','/users')
        cy.get('a').contains('Notifications').click()
        cy.url().should('contains','/notifications')
    })

      it('should allow a user to add a new post & validating reaction buttons', () => {
        //Adding a new post
        cy.get('#postTitle').type('Test Post')
        cy.get('#postAuthor').select(1)
        cy.get('#postContent').type('This is a test post.')
        cy.get('form > button').click()
        cy.get('.posts-list > :nth-child(2)').should('exist')
        cy.get('.posts-list > :nth-child(2) >h3').contains('Test Post')

        //Validating reaction buttons
        cy.get('.posts-list > :nth-child(2) > :nth-child(4) > :nth-child(1)').click().click().contains('2')
        cy.get('.posts-list > :nth-child(2) > :nth-child(4) > :nth-child(2)').click().contains('1')
        cy.get('.posts-list > :nth-child(2) > :nth-child(4) > :nth-child(3)').click().click().click().contains('3')
        cy.get('.posts-list > :nth-child(2) > :nth-child(4) > :nth-child(4)').click().click().contains('2')
        cy.get('.posts-list > :nth-child(2) > :nth-child(4) > :nth-child(5)').contains('0')
      })
    
      it('should allow a user to View & edit a post', () => {

        //View a post
        cy.get('.posts-list > :nth-child(2) > .button').click()
        cy.url().should('contains','/posts/')
        cy.get('.post').should('exist')
        cy.get('.post-list').should('not.exist')
        
        //Edit a post
        cy.get('.post > .button').click()
        cy.get('#postTitle').clear().type('Test Post')
        cy.get('#postContent').clear().type('This is a dummy post.')
        cy.get('section > button').click()
        cy.get('h2').should('have.text','Test Post')
        cy.get('.post-content').should('have.text','This is a dummy post.')
      })
    
      it('Validating Users tab', () => {
        cy.get('[href="/users"]').click()
        cy.get('li').should('have.length','3')
        cy.get(':nth-child(3) > a').click()
        cy.get(':nth-child(2) > a').click()
        cy.get('.post').should('exist')
      })

      it('Validating Notifications tab', () => {
        cy.get('[href="/notifications"]').click()
        cy.get('section.notificationsList > div').should('not.exist')
        cy.get('.button').click()
        cy.get('section.notificationsList > div').should('exist')
      })
    })
