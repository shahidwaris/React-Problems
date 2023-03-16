describe('Resume Builder App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('should display the correct heading', () => {
        cy.get('.MuiToolbar-root > .MuiTypography-root').should('contain', 'RESUME GENERATOR')
    })
  
    it('should display a form for entering personal details', () => {
        cy.get('span.MuiTypography-root.MuiCardHeader-subheader').should('exist').contains('Add your profile details')
    })
  
    it('Validating Profile details field', () => {
      cy.get('input[name="fname"]').type('Tony')
      cy.get('input[name="lname"]').type('Stark')
      cy.get('input[name="phone"]').type('5162323423')
      cy.get('input[name="address"]').type('123 Malibu')
      //add jpg file in fixtures  
      cy.get('input[name="url"]').selectFile('./cypress/fixtures/profile.jpg')
      cy.get(':nth-child(3) > .MuiButton-label').click()
      cy.get('.MuiButton-text > .MuiButton-label').click()
      cy.get('input[name="fname"]').should('have.value','Tony')
      cy.get('input[name="lname"]').should('have.value','Stark')
      cy.get('input[name="phone"]').should('have.value','5162323423')
      cy.get('input[name="address"]').should('have.value','123 Malibu') 
      cy.get(':nth-child(5) > .MuiButtonBase-root > .MuiButton-label').should('have.text','Remove profile.jpg')
    })
  
    it('Validating Education field',()=>{
        cy.get('.MuiButton-contained.makeStyles-button-5').click()
        cy.get('.MuiCardHeader-content > .MuiTypography-root').contains('Add your Education Details')

        //Adding educational fields
        cy.get('input[name="courseName"]').type('Mechanical Engineering')
        cy.get('input[name="completionYear"]').type('2001')
        cy.get('input[name="college"]').type('MIT')
        cy.get('input[name="percentage"]').type('95')

        //Adding more fields
        cy.get('.makeStyles-footer-15 > .MuiButton-contained').click()
        cy.get('div.makeStyles-instance-16').eq(1).should('exist')
        cy.get('input[name="courseName"]').eq(1).type('High School')
        cy.get('input[name="completionYear"]').eq(1).type('1995')
        cy.get('input[name="college"]').eq(1).type('Stark high school')
        cy.get('input[name="percentage"]').eq(1).type('99')
        cy.get(':nth-child(3) > .MuiButton-label').click()
        cy.get('.MuiButton-text').click()
        cy.get('.MuiButton-outlined').click()
        cy.get('div.makeStyles-instance-16').eq(1).should('not.exist')

        //Validating fields
        cy.get('input[name="courseName"]').should('have.value','Mechanical Engineering')
        cy.get('input[name="completionYear"]').should('have.value','2001')
        cy.get('input[name="college"]').should('have.value','MIT')
        cy.get('input[name="percentage"]').should('have.value','95')
    })

    it('Validating skills field',()=>{
        cy.get('.MuiButton-contained.makeStyles-button-5').click().click()
        //Adding skills
        cy.get('.MuiCardHeader-content > .MuiTypography-root').contains('Add your Skills')
        cy.get('input[name="skill"]').type('AI')
        cy.get('.makeStyles-footer-19 > .MuiButton-contained').click()
        cy.get('input[name="skill"]').eq(1).type('Robotics')
        cy.get('.makeStyles-footer-19 > .MuiButton-contained').click()
        cy.get('input[name="skill"]').eq(2).type('Machine learning')
        cy.get('.makeStyles-footer-19 > .MuiButton-contained').click()
        cy.get('input[name="skill"]').eq(3).type('Technological hoplology')

        //deleting skills
        cy.get('.MuiButton-outlined').click()
        cy.get('input[name="skill"]').eq(3).should('not.exist')
        cy.get(':nth-child(3) > .MuiButton-label').click()
        cy.get('.MuiButton-text > .MuiButton-label').click()

        //verifying if the skill field is saved
        cy.get('input[name="skill"]').should('have.value','AI')
        cy.get('input[name="skill"]').eq(1).should('have.value','Robotics')
        cy.get('input[name="skill"]').eq(2).should('have.value','Machine learning')
    })

    it('Validating preojects field',()=>{
        cy.get('.MuiButton-contained.makeStyles-button-5').click().click().click()
        cy.get('.MuiCardHeader-content > .MuiTypography-root').contains('Add your Mini Projects')
        
        //Adding projects
        cy.get('input[name="projectName"]').type('Jarvis')
        cy.get('input[name="techStack"]').type('AI')
        cy.get('textarea[name="description"]').type('An AI based intelligent system')

        cy.get('.makeStyles-footer-23 > .MuiButton-contained').click()

        cy.get('input[name="projectName"]').eq(1).type('Mark 1')
        cy.get('input[name="techStack"]').eq(1).type('robotics')
        cy.get('textarea[name="description"]').eq(1).type('A weaponized metal suit')

        cy.get(':nth-child(3) > .MuiButton-label').click()
        cy.get('.MuiButton-text > .MuiButton-label').click()
        cy.get('.MuiButton-outlined').click()

        //Validating filled data
        cy.get('input[name="projectName"]').should('have.value','Jarvis')
        cy.get('input[name="techStack"]').should('have.value','AI')
        cy.get('textarea[name="description"]').should('have.value','An AI based intelligent system')
    })

    it('Validating social media links',()=>{
        cy.get('.MuiButton-contained.makeStyles-button-5').click().click().click().click()

        //Adding social media links
        cy.get('input[name="Social"]').type('linkedin.com/tony-stark')
        cy.get('.makeStyles-footer-27 > .MuiButton-contained').click()
        cy.get('input[name="Social"]').eq(1).type('twitter.com/tonyED-stark')
        cy.get('.makeStyles-footer-27 > .MuiButton-contained').click()
        cy.get('input[name="Social"]').eq(2).type('starkmedia.com/Thomas-stark')

        //Validating input data provided
        cy.get('input[name="Social"]').should('have.value','linkedin.com/tony-stark')
        cy.get('input[name="Social"]').eq(1).should('have.value','twitter.com/tonyED-stark')
        cy.get('input[name="Social"]').eq(2).should('have.value','starkmedia.com/Thomas-stark')

        cy.get(':nth-child(3) > .MuiButton-label').click()
    })

    it('filling out complete form and submitting',()=>{
        //Personal details
        cy.get('input[name="fname"]').type('Steve')
        cy.get('input[name="lname"]').type('Rogers')
        cy.get('input[name="phone"]').type('1518963232')
        cy.get('input[name="address"]').type('256 High Street, Brooklyn')  
        cy.get('input[name="url"]').selectFile('./cypress/fixtures/profile.jpg')

        cy.get(':nth-child(3) > .MuiButton-label').click()

        //Educational Details
        cy.get('input[name="courseName"]').type('Study of warfare')
        cy.get('input[name="completionYear"]').type('1932')
        cy.get('input[name="college"]').type('University of Brooklyn')
        cy.get('input[name="percentage"]').type('98')
        cy.get('.makeStyles-footer-15 > .MuiButton-contained').click()
        cy.get('div.makeStyles-instance-16').eq(1).should('exist')
        cy.get('input[name="courseName"]').eq(1).type('High School')
        cy.get('input[name="completionYear"]').eq(1).type('1933')
        cy.get('input[name="college"]').eq(1).type('Brooklyn high school')
        cy.get('input[name="percentage"]').eq(1).type('62')

        cy.get(':nth-child(3) > .MuiButton-label').click()

        //Skills
        cy.get('input[name="skill"]').type('Bare Arm Combat')
        cy.get('.makeStyles-footer-19 > .MuiButton-contained').click()
        cy.get('input[name="skill"]').eq(1).type('Stealth')
        cy.get('.makeStyles-footer-19 > .MuiButton-contained').click()
        cy.get('input[name="skill"]').eq(2).type('Paramedic')
        cy.get('.makeStyles-footer-19 > .MuiButton-contained').click()
        cy.get('input[name="skill"]').eq(3).type('Firearm combat')

        cy.get(':nth-child(3) > .MuiButton-label').click()

        //Projects
        cy.get('input[name="projectName"]').type('Free captured soldiers')
        cy.get('input[name="techStack"]').type('Stealth')
        cy.get('textarea[name="description"]').type('Mission to free soldiers captured by Hydra')

        cy.get('.makeStyles-footer-23 > .MuiButton-contained').click()

        cy.get('input[name="projectName"]').eq(1).type('Red Skull Captivity')
        cy.get('input[name="techStack"]').eq(1).type('Firearm combat')
        cy.get('textarea[name="description"]').eq(1).type('Mission to capture Red Skull to finish Hydra')

        cy.get(':nth-child(3) > .MuiButton-label').click()

        //Social media links
        cy.get('input[name="Social"]').type('usmilitary.us.in/steve-rogers')
        cy.get('.makeStyles-footer-27 > .MuiButton-contained').click()
        cy.get('input[name="Social"]').eq(1).type('avengers.org/captain')
        cy.get('.makeStyles-footer-27 > .MuiButton-contained').click()
        cy.get('input[name="Social"]').eq(2).type('starkmedia.com/american-hero')

        cy.get(':nth-child(3) > .MuiButton-label').click()

        cy.get('div>p').contains('All steps completed - your resume is ready!!')

        //Validating the data entered in resume
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiTypography-root').contains('Steve')
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiTypography-root').contains('Rogers')
        cy.get('.makeStyles-ParentResumePaper-31 > :nth-child(1) > :nth-child(2) > .MuiGrid-container > :nth-child(2) > :nth-child(1)')
        .contains('256 High Street, Brooklyn')
        cy.get('.makeStyles-ParentResumePaper-31 > :nth-child(1) > :nth-child(2) > .MuiGrid-container > :nth-child(2) > :nth-child(2)')
        .contains('1518963232')

        cy.get(':nth-child(1) > :nth-child(3) > .MuiTypography-h6').contains('University of Brooklyn')
        cy.get('.MuiGrid-container > :nth-child(1) > :nth-child(3) > :nth-child(2)').contains('1932')
        cy.get(':nth-child(1) > :nth-child(3) > :nth-child(3)').contains('Study of warfare')
        cy.get(':nth-child(3) > :nth-child(4)').contains('98')
        cy.get(':nth-child(1) > :nth-child(4) > .MuiTypography-h6').contains('Brooklyn high school')
        cy.get(':nth-child(1) > :nth-child(4) > :nth-child(2)').contains('1933')
        cy.get(':nth-child(1) > :nth-child(4) > :nth-child(3)').contains('High School')
        cy.get(':nth-child(4) > :nth-child(4)').contains('62')

        cy.get(':nth-child(2) > :nth-child(3) > .MuiTypography-h6').contains('Free captured soldiers')
        cy.get(':nth-child(2) > :nth-child(3) > :nth-child(2)').contains('Mission to free soldiers captured by Hydra')
        cy.get(':nth-child(2) > :nth-child(3) > :nth-child(3)').contains('Tech Stack : Stealth')
        cy.get(':nth-child(2) > :nth-child(4) > .MuiTypography-h6').contains('Red Skull Captivity')
        cy.get(':nth-child(2) > :nth-child(4) > :nth-child(2)').contains('Mission to capture Red Skull to finish Hydra')
        cy.get(':nth-child(2) > :nth-child(4) > :nth-child(3)').contains('Tech Stack : Firearm combat')

        cy.get(':nth-child(3) > a').contains('usmilitary.us.in/steve-rogers')
        cy.get(':nth-child(4) > a').contains('avengers.org/captain')
        cy.get(':nth-child(5) > a').contains('starkmedia.com/american-hero')

        cy.get('.MuiGrid-grid-xs-3 > .MuiGrid-container > .MuiGrid-root > .makeStyles-ParentSkillSection-33 > :nth-child(3)')
        .contains('Bare Arm Combat')
        cy.get('.MuiGrid-grid-xs-3 > .MuiGrid-container > .MuiGrid-root > .makeStyles-ParentSkillSection-33 > :nth-child(4)')
        .contains('Stealth')
        cy.get('.MuiGrid-grid-xs-3 > .MuiGrid-container > .MuiGrid-root > .makeStyles-ParentSkillSection-33 > :nth-child(5)')
        .contains('Paramedic')
        cy.get('.MuiGrid-grid-xs-3 > .MuiGrid-container > .MuiGrid-root > .makeStyles-ParentSkillSection-33 > :nth-child(6)')
        .contains('Firearm combat')    
    })
  })
  
