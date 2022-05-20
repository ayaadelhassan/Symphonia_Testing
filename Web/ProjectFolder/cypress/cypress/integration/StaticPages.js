
describe('Static Pages (logged in)', function () {
    this.beforeEach(() => { //I need to log in before each test here
        //to stub the server for faster execution
        cy.server()
        cy.route({
         method: 'POST',
         url: '/login',
         response: '{"result": true}',
         status: 200
       })
        cy.visit('/login', {timeout: 80000})
        cy.Login('testemail@gmail.com','123456789')//custom command
        cy.wait(5000)
        cy.visit('/',{timeout: 80000})
        
       })


       it('The Home Page', function () {
        cy.log('steps: 1-Go to The Home page 2-Assert it is complete');
        cy.log('Expected Result:The Home page is complete');
        cy.contains('Premium').should('be.visible')
        cy.contains('Help').should('be.visible')
        cy.contains('Download').should('be.visible')
        cy.contains('Go Premium. Be happy.')
        cy.log('Actual Result:The Home page is complete');
        cy.log('SUCCESS');
    })

    it('The Help Page', function () {
        cy.log('The page was not deployed yet')
    })

       it('The About Page', function () {
        cy.log('steps: 1-Go to The about page 2-Assert it is complete');
        cy.log('Expected Result:The About page is complete');
        cy.contains('Symphonia').click()
        cy.scrollTo('bottom')
        cy.contains('About').click({force: true})
        cy.url().should('include','about')
        cy.contains('About US').should('exist')
        cy.scrollTo('center')
        cy.contains('Our Stuff').should('exist')
        cy.get('[href="#testing"]').click()
        cy.wait(5000)
        cy.contains('Testing member').should('be.visible')
        cy.log('Actual Result:The Page does not show the clicked-on team');
        cy.log('Failed');
    })

    it('The Premium Page', function () {
        cy.log('steps: 1-Go to The Premium page 2-Assert it is complete');
        cy.log('Expected Result:The premium page is complete');
        cy.contains('Premium').click({force: true})
        cy.url().should('include','premium')
        cy.get('.download-button-large').should('be.visible')
        cy.get('.col-sm-10 > .download-button-large').first().should('be.visible')
        cy.log('Actual Result:The premium page is complete ');
        cy.log('SUCCESS');
    })

    it('The non-existing page', function () {
        cy.log('steps: 1-Go to unvalid path 2-Assert it is complete');
        cy.log('Expected Result: Complete');
        cy.visit('/anything')
        cy.get('strong').should('exist')
        cy.log('Actual Result: Complete');
        cy.log('SUCCESS');
    })

})
/////////////////////////
describe('Static Pages (Not logged in)', function () {
    this.beforeEach(() => { 
  
        cy.visit('/',{timeout: 80000})
        
       })


       it('The Home Page', function () {
        cy.log('steps: 1-Go to The Home page 2-Assert it is complete');
        cy.log('Expected Result:The Home page is complete');
        cy.contains('Premium').should('be.visible')
        cy.contains('Help').should('be.visible')
        cy.contains('Download').should('be.visible')
        cy.contains('Sign up').should('be.visible')
        cy.contains('Log in').should('be.visible')
        cy.log('Actual Result:The Home page is complete');
        cy.log('SUCCESS');
    })

    it('The Help Page', function () {
        cy.log('The page was not deployed yet')
    })

       it('The About Page', function () {
        cy.log('steps: 1-Go to The about page 2-Assert it is complete');
        cy.log('Expected Result:The About page is complete');
        cy.contains('Symphonia').click()
        cy.scrollTo('bottom')
        cy.contains('About').click({force: true})
        cy.url().should('include','about')
        cy.contains('About US').should('exist')
        cy.scrollTo('center')
        cy.contains('Our Stuff').should('exist')
        cy.get('[href="#testing"]').click()
        cy.wait(5000)
        cy.contains('Testing member').should('be.visible')
        cy.log('Actual Result:The Page does not show the clicked-on team');
        cy.log('Failed');
    })

    it('The Premium Page', function () {
        cy.log('steps: 1-Go to The Premium page 2-Assert it is complete');
        cy.log('Expected Result:The premium page is complete and the page redirects me to the log in page to continue the process');
        cy.contains('Premium').click({force: true})
        cy.url().should('include','premium')
        cy.get('.download-button-large').should('be.visible')
        cy.get('.col-sm-10 > .download-button-large').first().click()
        cy.wait(2000)
        cy.url().should('include','login') 
        cy.log('Actual Result:The premium page is complete but nothing happens when clicking the get to premium button ');
        cy.log('Failed');
    })

})
