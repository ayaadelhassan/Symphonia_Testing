before(() => {
  cy.visit('https://thesymphonia.ddns.net/')
  cy.contains('Log in').click({force: true}) 
  cy.get('input[id="login-username"]').type('test123@test.com')
  cy.get('input[id="login-password"]').type('password')
  cy.get('button[id="login-button"]').click()
    cy.wait(10000)
  })
describe('Change password', function() {
    
      beforeEach(() => {
        cy.visit('https://thesymphonia.ddns.net/account/changePassword')
        cy.wait(1500)
        
      })

it('Type blank current password', function() {
   
    cy.get('input[id="pass"]').clear().wait(1500).type('12345678')
    cy.get('input[id="confirm"]').clear().wait(1500).type('12345678')
    cy.contains('save profile').click({force: true})
    cy.wait(1500)
    cy.contains('Sorry,wrong password or old one')

})
it('Type wrong current password', function() {
    
      cy.get('input[id="current"]').clear().wait(1500).type('12345678')
      cy.get('input[id="pass"]').clear().wait(1500).type('12345678')
      cy.get('input[id="confirm"]').clear().wait(1500).type('12345678')
      cy.contains('save profile').click({force: true})
      cy.wait(1500)
      cy.contains('Sorry,wrong password or old one')
      cy.wait(1500)
  })
it('Donnot type new password', function() {
    cy.get('input[id="current"]').clear().wait(1500).type('password')
    cy.contains('save profile').click({force: true})
    cy.wait(1500)
    cy.contains('Enter a password to continue.')
    cy.contains('Please verify your password')
})
it('Verify with wrong password', function() {
    cy.get('input[id="current"]').clear().wait(1500).type('password')
    cy.get('input[id="pass"]').clear().wait(1500).type('12345678')
    cy.get('input[id="confirm"]').clear().wait(1500).type('012345678')
    cy.wait(1500)
    cy.contains('save profile').click({force: true})
    cy.contains('Please verify your password')

})
it('Change password', function() {
    cy.get('input[id="current"]').type('password')
    cy.get('input[id="pass"]').type('yahoo789')
    cy.get('input[id="confirm"]').type('yahoo789')
    cy.contains('save profile').click({force: true})
    cy.contains('Password updated')
    cy.wait(1500)
    cy.contains('Profile').click()
    cy.contains(' Log Out').click()
    cy.wait(2000)
    cy.contains('Log in').click({force: true})
    cy.wait(1500)
    cy.get('input[id="login-username"]').type('test123@test.com')
    cy.get('input[id="login-password"]').type('yahoo789')
    cy.get('button[id="login-button"]').click()
    cy.wait(1500)
    cy.contains(' testt') // assertion for logged in
})
})