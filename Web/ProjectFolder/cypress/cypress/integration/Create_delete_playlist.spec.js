/////create a playlist, check if it is added to my playlists/////
before(() => {
    cy.visit('https://thesymphonia.ddns.net/login') 
    cy.get('input[id="login-username"]').type('testmail333@yahoo.com')
    cy.get('input[id="login-password"]').type('yahoo789')
    cy.get('button[id="login-button"]').click()
    cy.wait(10000)
  })
  describe('Create/delete playlist', function() {
      it('create playlist', function() {
        cy.contains('Create Playlist').click({force: true})
        cy.get('input[id="playlistName"]').type('music')
        cy.wait(1500)
        cy.get('button[id="create"]').click({force: true})
        cy.wait(1500)
        cy.visit('https://thesymphonia.ddns.net/webhome/collection/playlists')
        cy.wait(1500)
        cy.contains('music')
        })
     
    
      it('delete playlist', function() {
        cy.visit('https://thesymphonia.ddns.net/webhome/collection/playlists')
        cy.wait(1500)
        cy.contains('music').click({force: true})
        cy.wait(1500)
        cy.contains('Close').click({force: true}) /// to close pop-up ads
        cy.wait(1500)
        cy.get('button[id="menuDots"]').click({force: true})
        cy.wait(1500)
        cy.contains('Delete').click({force: true})
        cy.wait(1500)
        cy.get('button[id="deleted"]').click({force: true})
        cy.visit('https://thesymphonia.ddns.net/webhome/collection/playlists')
        cy.contains('music').should('not.exist')
        })
      })