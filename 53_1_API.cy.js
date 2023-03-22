describe("DataFetcher component", () => {
    it("loads data from the API and displays it", () => {
      cy.intercept("https://dummyjson.com/products").as("getData");
  
      cy.visit("http://localhost:3000");
  
      cy.wait("@getData").then(({ response }) => {
        const data = response.body;
  
        cy.get("h1").should("have.text", "Data Fetched from API");
        cy.get("pre").should("have.text", JSON.stringify(data, null, 2));
      });
    });
  
    it("displays error message if there is an error fetching data", () => {
      cy.intercept("https://dummyjson.com/products", { forceNetworkError: true }).as("getData");
  
      cy.visit("http://localhost:3000");
  
      cy.get("div").contains("An error occurred: ");
    });
  
    it("displays 'No data found' message if no data is returned from API", () => {
      cy.intercept("https://dummyjson.com/products", []).as("getData");
  
      cy.visit("http://localhost:3000");
  
      cy.get("div").contains('[]');
      cy.get("div").should('not.have.text','products')
    });
  });
