describe("AboveFold Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("displays a list of images fetched from the API", () => {
    cy.get("img").should("have.length.above", 0);
  });

  it("displays a loading message when more items are being fetched", () => {
    cy.scrollTo("bottom");
    cy.get(".loadmore").should("be.visible");
  });

  it("loads more items when the user scrolls to the bottom of the page", () => {
    cy.scrollTo("bottom");
    cy.get(".loadmore").should("be.visible");

    cy.wait(1000); // wait for items to load

    cy.get("img").should("have.length.above", 10); // check if more items were added
  });
});

