describe("Blue Whales App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
      cy.intercept("GET", "https://reqres.in/api/users").as("getUserList");
    });
  
    it("displays 'No data found' message when user list is empty", () => {
      cy.intercept("GET", "https://reqres.in/api/users", { data: [] });
      cy.get(".btn").click();
      cy.request("@getUserList");
      cy.get("table").should("be.visible");
      cy.contains("No data found to display.").should("be.visible");
    });
  
    it("displays user list with correct data", () => {
      cy.fixture("users.json").then((users) => {
        cy.intercept("GET", "https://reqres.in/api/users", { data: users });
        cy.get(".btn").click();
        cy.request("@getUserList");
        cy.get("table").should("be.visible");
        users.forEach((user, index) => {
          cy.get(`tbody tr:nth-child(${index + 1})`).within(() => {
            cy.get("td:nth-child(1)").should("have.text", user.first_name);
            cy.get("td:nth-child(2)").should("have.text", user.last_name);
            cy.get("td:nth-child(3)").should("have.text", user.email);
            cy.get("td:nth-child(4) img").should("have.attr", "src", user.avatar);
          });
        });
      });
    });
  });
  
