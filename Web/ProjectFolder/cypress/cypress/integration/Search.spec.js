before(() => {
    cy.visit('https://thesymphonia.ddns.net/')
    cy.contains('Log in').click({force: true}) 
    cy.get('input[id="login-username"]').type('testmail333@yahoo.com')
    cy.get('input[id="login-password"]').type('yahoo789')
    cy.get('button[id="login-button"]').click()
    cy.wait(10000)
  })
describe('Search Test', function() {
    it('search for song', function() {
      cy.visit('https://thesymphonia.ddns.net/webhome/album/5e701fdf2672a63a60573a06')
      cy.wait(1500)
      cy.contains(' Play ').click({force: true})
      cy.visit('https://thesymphonia.ddns.net/webhome/search/radio')
      cy.get('input[id="input-38"]').clear().wait(1500).type('radi') ///search for radio by lana del rey
      cy.wait(2000)
      cy.contains(' Radio ')
      cy.contains(' Born To Die ')
      })
    it('search for artist', function() {
      cy.visit('https://thesymphonia.ddns.net/webhome/search/radio')
      cy.wait(1000)
      cy.get('input[id="input-38"]').clear().wait(1500).type('lana') ///search for by lana del rey
      cy.wait(2000)
      cy.contains('Lana Del Rey')
     })
    })