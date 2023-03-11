import App from '../../src/components/Router_60-61_1'

describe('React Router Program', () => {

    beforeEach(()=>{
      cy.mount(<App/>)
    })

    //Verify that it renders home component
    it('renders Home component', () => {
      cy.get('a[href="/"]').click();
      cy.contains('Home')
      cy.contains('Welcome to my website!');
    });
  
    //Verify that it renders About component
    it('renders About component', () => {
      cy.get('a[href="/about"]').click();
      cy.contains('About');
      cy.contains('This is a sample React Router program.');
    });
  
    //Verify that it navigates to Home and About components
    it('navigates to Home and About components', () => {
      // Click on the About link and check if About component is rendered
      cy.get('a[href="/about"]').click();
      cy.url().should('include', '/about');
      cy.contains('About');
      cy.contains('This is a sample React Router program.');
  
      // Click on the Home link and check if Home component is rendered
      cy.get('a[href="/"]').click();
      cy.url().should('not.include', '/about');
      cy.contains('Welcome to my website!');
    });
  });
