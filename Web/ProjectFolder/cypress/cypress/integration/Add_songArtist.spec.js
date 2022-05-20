before(() => {
    cy.visit('https://thesymphonia.ddns.net/')
    cy.contains('Log in').click({force: true}) 
    cy.get('input[id="login-username"]').type('test3@test.com')
    cy.get('input[id="login-password"]').type('password')
    cy.get('button[id="login-button"]').click()
    cy.wait(10000)
  })
  describe('Add/Remove song to an album', function() {
    it('Add song to album', function() {
        cy.contains(' Go to Symphonia Artist ').click({force: true}) 
        cy.contains('Albums').click({force: true}) 
        cy.wait(1000)
        cy.contains('The Slow Rush').click({force: true}) 
        cy.wait(1000)
        cy.get('i[class="v-icon notranslate mdi mdi-plus theme--dark"]').click()
        cy.wait(1500)
        cy.contains('Song Title').click({force: true}) 
        cy.get('input[type="text"]').clear().wait(1500).type('Sonng')
        const song ='int.mp3';
        cy.get('input[type="file"]').attachFile(song);
        cy.get('input[value="5e8072e5e478cf39b47bd1ef"]').check({force: true})
        cy.wait(1000)
        cy.get('button[class="v-btn v-btn--flat v-btn--text theme--dark v-size--default success--text text--darken-1"]').click({force: true})// submit button
        cy.wait(20000)
        cy.contains('The Slow Rush').click({force: true}) 
        cy.wait(1000)
        cy.contains('Sonng')
     })

    })