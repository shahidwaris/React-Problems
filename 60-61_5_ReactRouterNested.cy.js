/// <reference types="cypress"/>

describe('template spec', () => {
  beforeEach('passes', () => {
    cy.visit('https://kutf75.csb.app/')
  })

  it('Rendering the app',()=>{
    cy.get(':nth-child(1) > a').contains('Home')
    cy.get(':nth-child(2) > a').contains('Women')
    cy.get('main > div').contains('Index')
  })

  it('Creating items history',()=>{
    cy.get(':nth-child(2) > a').click()
    cy.get('ul').should('exist')
    cy.url().should('include','/women')
    cy.get('nav > ul > :nth-child(1) > a').click()
    cy.url().should('include','/')
    cy.get('main > div').contains('Index')
  })

  it('Creating history for items picked',()=>{
    cy.get(':nth-child(2) > a').click()
    cy.get('li').contains('Shirt').click()
    cy.get(':nth-child(1) > div').contains('Shirt')
    cy.url().should('include','/women/Shirt')
  })
})
