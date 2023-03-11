describe("React app tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it('loads the user list successfully', () => {
        cy.contains('h1', 'User List');
        cy.get('li').should('have.length.greaterThan', 0);
        cy.get("li").first().find("a").should("have.attr", "href", "/users/1");
      });
      
      it('displays the correct user information', () => {
        cy.get('li:first-child a').click();
        cy.contains('p', 'Name: Leanne Graham');
        cy.contains('p', 'Username: Bret');
        cy.contains('p', 'Email: Sincere@april.biz');
        cy.contains('p', 'Phone: 1-770-736-8031 x56442');
        cy.contains('p', 'Website: hildegard.org');
        cy.visit("http://localhost:5173/");
        cy.get('li:last-child a').click();
        cy.contains('p', 'Name: Clementina DuBuque');
        cy.contains('p', 'Username: Moriah.Stanton');
        cy.contains('p', 'Email: Rey.Padberg@karina.biz');
        cy.contains('p', 'Phone: 024-648-3804');
        cy.contains('p', 'Website: ambrose.net');
      });
      
      it('displays a "Loading..." message while user information is being fetched', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/*', {}).as('getUser');
        cy.get('li:first-child a').click();
        cy.contains('div', 'Loading...');
        cy.wait('@getUser');
      });
  });
  
