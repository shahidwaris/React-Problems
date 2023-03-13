describe('React App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
    });
  
    it('displays intro text', () => {
      cy.get('h1').should('have.text', 'A short Naration of Lorem Ipsum');
      cy.get('h4').should('have.text', 'Below Contains A title and Body gotten from a random API, Please take your time to Review');
    });
  
    it('displays posts fetched from API', () => {
      cy.get('li').should('have.length.greaterThan', 0);
    });
  
      it('should display loading state by default', () => {
        cy.get('h4').should('have.text', 'Below Contains A title and Body gotten from a random API, Please take your time to Review');
        cy.get('li').should('have.length', 1);
        cy.get('li')
          .find('.title')
          .should('have.text', 'Title :Loading tiltes');
        cy.get('li')
          .find('.body')
          .should('have.text', 'Body :Loading Body');
      });
    
      it('should display posts after fetching from API', () => {
        cy.intercept('https://jsonplaceholder.typicode.com/posts', { fixture: 'posts.json' }).as('getPosts');
        
        cy.get('h1').should('not.have.text', 'Loading tiltes');
        cy.get('h4').should('not.have.text', 'Below Contains A title and Body gotten from\na random API, Please take your time to Review');
        cy.get('li')
          .eq(0)
          .find('.title')
          .should('have.text', 'Title :sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
        cy.get('li')
          .eq(0)
          .find('.body')
          .should('have.text', 'Body :quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');
        cy.get('li')
          .eq(1)
          .find('.title')
          .should('have.text', 'Title :qui est esse');
        cy.get('li')
          .eq(1)
          .find('.body')
          .should('have.text', 'Body :est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla');
        cy.get('li')
          .eq(2)
          .find('.title')
          .should('have.text', 'Title :ea molestias quasi exercitationem repellat qui ipsa sit aut');
        cy.get('li')
          .eq(2)
          .find('.body')
          .should('have.text', 'Body :et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut');
      });
    
      
  });
  
