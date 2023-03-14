/// <reference types="cypress"/>

describe('Flight Booking App',()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/')
    })

    it('Checking if the app is rendered',()=>{
        cy.get('.MuiToolbar-root > .MuiTypography-root').should('have.text','Flight Booking App');
        cy.get('.MuiGrid-root > .MuiTypography-root').contains('Welcome to Flight Booking App');
        cy.get('button').should('exist');
    })

    it('Checking if drop-down and buttons are working and verifying when flights are not available',()=>{
        cy.get('button').click()
        //checking first input field
        cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root')
        .click()
        cy.get('ul').should('exist')
        cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('be').get('li').contains('Bengaluru').click()
        

        //Checking second input field
        cy.get(':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root')
        .click()
        cy.get('ul').should('exist')
        cy.get(':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('ko').get('li').contains('Kolkata').click()
        
        cy.get(':nth-child(5) > button').should('be.disabled')

        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('2023-03-27').should('have.attr','value','2023-03-27')
        cy.get(':nth-child(5) > button').should('be.enabled').click()

        cy.get('.MuiGrid-root > .MuiTypography-root').should('have.text','No Records Found..')
    })

    it('Filling out the form and search for the flights and verifying when flights are available',()=>{
        cy.get('button').click()

        //checking for one way destination
        cy.get('input[value="one"]').check()

        //Selecting Source city
        cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('mum').get('li').contains('Mumbai').click()

        //Selecting Destination city
        cy.get(':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('ne').get('li').contains('New Delhi').click()

        //Selecting Date
        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('2023-04-06')
        cy.get(':nth-child(5) > button').click()

        //Selecting flight from available flights
        cy.get(':nth-child(2) > .MuiTableCell-root > .MuiPaper-root > .MuiCardContent-root > .MuiGrid-container > .makeStyles-textAlign-13 > .MuiButtonBase-root')
        .click()
    })

    it('Validations for person details form',()=>{
        cy.get('button').click()
        cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('ko').get('li').contains('Kolkata').click()
        cy.get(':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('ben').get('li').contains('Bengaluru').click()
        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('2024-01-10')
        cy.get(':nth-child(5) > button').click()
        cy.get(':nth-child(1) > .MuiTableCell-root > .MuiPaper-root > .MuiCardContent-root > .MuiGrid-container > .makeStyles-textAlign-13 > .MuiButtonBase-root')
        .click()

        //Person details form
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiTypography-root')
        .should('have.text','Booking Confirmation for Flight Air India (AI-266)')

        //First and Last Name
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('Sherlock')
        cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('Holmes')
        
        //Should not submit form if all the mandate fields are not filled
        cy.get('button').click().get(':nth-child(6) > .MuiTypography-root').contains('All Fields are mandatory')

        //Validating email address & phone number
        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('sherlock')
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('9876543210')
        cy.get('button').click().get(':nth-child(6) > .MuiTypography-root').contains('All Fields are mandatory')
        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .clear().type('sherlock_holmes@gmail.com')
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .clear().type('987654321')
        cy.get('button').click().get(':nth-child(6) > .MuiTypography-root').contains('All Fields are mandatory')

        //Should submit form when all details are correctly filled
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .clear().type('9876543210')
        cy.get('button').click().get('p')
        .contains('Thank you for the Booking. Click the below button to return to home page')
        .get('button').click().get('h5').contains('Welcome to Flight Booking App')
    })

    it('Validating Round Trip booking',()=>{
        cy.window().then((win) => {
            cy.stub(win.console, 'log').as('consoleLog');
          });
        cy.get('button').click()
        cy.get('input[value="both"]').check()
        cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('mum').get('li').contains('Mumbai').click()
        cy.get(':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
        .click().type('kol').get('li').contains('Kolkata').click()
        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('2023-04-12')
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('2023-07-28')
        cy.get(':nth-child(6) > button').click()
        cy.get(':nth-child(2) > .MuiTableCell-root > .MuiPaper-root > .MuiCardContent-root > .MuiGrid-container > .makeStyles-textAlign-13 > .MuiButtonBase-root')
        .click()
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('Yamraj')
        cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('Singh')
        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('yamraj_singh@death.heaven')
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type('1313131313')
        cy.get('button').click().get('p')
        .contains('Thank you for the Booking. Click the below button to return to home page')
        cy.get('@consoleLog').should('have.been.calledWithMatch', {
            airlineLogo: "https://www.logosurfer.com/wp-content/uploads/2018/03/air-india-logo_0.png",
            airlineName: "Air India",
            arivalCity: "Kolkata",
            arivalTime: "05:00",
            deptCity: "Mumbai",
            deptTime: "03:00",
            flightNbr: "AI-275",
            noOfStops: "0",
            price: "1500"
          });
    })
})
