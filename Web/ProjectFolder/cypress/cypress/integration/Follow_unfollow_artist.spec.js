////////visit artist's page then follow him check to see if he is added to my artists////////////
////////visit artist's page then unfollow him check to see if he is removed from my artists////////////
before(() => {
  cy.visit('https://thesymphonia.ddns.net/',{timeout: 80000})
  cy.contains('Log in').click({force: true}) 
  cy.get('input[id="login-username"]').type('testmail333@yahoo.com')
  cy.get('input[id="login-password"]').type('yahoo789')
  cy.get('button[id="login-button"]').click()
  cy.wait(10000)

})
describe('Follow/unfollow Artist Test', function() {
  beforeEach(() => {
    cy.visit('/webhome/artist/5e8137aa54660672fd699882/overview')
    cy.wait(1500)
    
  })
    it('Follow artist', function() {
      cy.get('button[class="mx-3 v-btn v-btn--depressed v-btn--flat v-btn--outlined v-btn--rounded theme--dark v-size--default success--text"]').click()
      cy.wait(1500)
      cy.visit('/webhome/album/5e794163c01c024ecc3c31d3') //play a song not by Tame Impala
      cy.wait(1500)
       cy.contains(' Play ').click({force: true})
       cy.wait(3000)
      cy.contains(' Your Library ').click({force: true})
      cy.wait(1500)
      cy.contains('Artists').click({force: true})
      cy.contains('Tame Impala')
      })
   
  
    it('Unfollow artist', function() {
      cy.get('button[class="mx-3 v-btn v-btn--depressed v-btn--flat v-btn--outlined v-btn--rounded theme--dark v-size--default error--text"]').click()
      cy.wait(1500)
      cy.contains(' Your Library ').click({force: true})
      cy.contains('Artists').click({force: true})
      cy.contains('Tame Impala').should('not.exist')
      })
    })
   
    