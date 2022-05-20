describe('Show Ads Test', function() {
  it('Show ad', function() {
    cy.visit('https://thesymphonia.ddns.net/')
    cy.contains('Log in').click({force: true}) 
    cy.get('input[id="login-username"]').type('testmail333@yahoo.com')
    cy.get('input[id="login-password"]').type('yahoo789')
    cy.get('button[id="login-button"]').click()
    cy.wait(1500)
    cy.contains('Young, Wild and Free').click({force: true}) 
    cy.wait(1500)
    cy.contains('Get Premium') // verify AD window popped up 
    cy.contains('Close')
    })
 
  })