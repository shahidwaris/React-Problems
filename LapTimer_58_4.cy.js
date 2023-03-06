import LapTimer from "../../src/components/LapTimer_58_4";

describe('LapTimer', () => {
    beforeEach(() => {
      cy.mount(<LapTimer/>);
      cy.clock()
    });

    //Verify that it displays the correct initial time (00:00:00)
    it('displays the correct initial time', () => {
        cy.get('div').contains('00:00:00').should('exist');
    });

    //Verify that it starts the timer when Start button is clicked
    it('starts the timer when Start button is clicked', () => {
        cy.get('button').contains('Start').click();
        cy.tick(100);
        cy.get('div').contains('00:00:10').should('exist');
    });

    //Verify that it stops the timer when stop button is clicked
    it('stops the timer when Stop button is clicked', () => {
        cy.get('button').contains('Start').click();
        cy.tick(500);
        cy.get('button').contains('Stop').click();
        cy.get('div').contains('00:00:50').should('exist');
    });

    //Verify that it adds a lap when Lap button is clicked
    it('adds a lap when Lap button is clicked', () => {
        cy.get('button').contains('Start').click();
        cy.tick(1000);
        cy.get('button').contains('Lap').click();
        cy.get('ul li').should('have.length', 1);
        cy.get('ul li').contains('00:01:00').should('exist');
        cy.tick(1000);
        cy.get('button').contains('Lap').click();
        cy.get('ul li').should('have.length', 2);
        cy.get('ul li').contains('00:02:00').should('exist');
    });

    //Verify that it resets the timer and laps when Reset button is clicked
    it('resets the timer and laps when Reset button is clicked', () => {
        cy.get('button').contains('Start').click();
        cy.tick(1000);
        cy.get('button').contains('Lap').click();
        cy.tick(500);
        cy.get('button').contains('Reset').click();
        cy.get('div').contains('00:00:00').should('exist');
        cy.get('ul li').should('not.exist');
    });
});
