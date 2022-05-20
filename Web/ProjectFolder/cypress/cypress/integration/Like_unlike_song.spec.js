before(() => {
    cy.visit('https://thesymphonia.ddns.net/')
    cy.contains('Log in').click({force: true}) 
    cy.get('input[id="login-username"]').type('testmail333@yahoo.com')
    cy.get('input[id="login-password"]').type('yahoo789')
    cy.get('button[id="login-button"]').click()
    cy.wait(10000) 
  })
  describe('Like/unlike a song Test', function() {
 
      it('Like song', function() {
       cy.contains('Blue Velvet').click({force: true}) 
       cy.wait(1500)
       cy.contains(' Play ').click({force: true})
       cy.wait(2000)
       cy.get('i[class="v-icon notranslate icons mdi mdi-heart-outline theme--light"]').click({force: true})
       cy.wait(1500)
       cy.contains(' Liked Songs ').click({force: true})
       cy.wait(1500)
       cy.contains(' Blue Velvet ')
       cy.wait(1500)
     })
     
    
      it('Unlike song', function() {
        cy.get('i[class="v-icon notranslate icons mdi mdi-heart theme--light green--text"]').click({force: true})
        cy.wait(1500)
        cy.visit('https://thesymphonia.ddns.net/webhome/album/5e701fdf2672a63a60573a06')
        //cy.contains('The Slow Rush').click({force: true}) 
       cy.wait(1500)
       cy.contains(' Play ').click({force: true})
       cy.wait(2000)
        cy.visit('https://thesymphonia.ddns.net/webhome/collection/tracks')
        cy.wait(1500)
        cy.contains(' Blue Velvet ').should('not.exist')
        cy.wait(1500)
        })
      })
     
      