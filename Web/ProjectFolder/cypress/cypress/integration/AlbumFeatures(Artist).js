
import 'cypress-file-upload'; //to be used for uploading files
describe('Album Features', function () {
    this.beforeEach(() => { //I need to log in before each test here
        //to stub the server for faster execution
        cy.server()
        cy.route({
         method: 'POST',
         url: '/login',
         response: '{"result": true}',
         status: 200
       })
        cy.visit('/login')
        cy.Login("test3@test.com","password") //custom command
       })

       it('Add a new album', function () {
        cy.log('steps: 1-Go to my artist accoung 2-Go to my albums 3-Add a new album 4-Assert it is added');
        cy.log('Expected Result:The created album is added');
        const albumname='Anime'
        cy.contains("Go to Symphonia Artist").click()
        cy.get('[href="/SymphoniaArtist/5e8137aa54660672fd699882/albums"] > .v-list-item__icon > .v-icon').click()
        cy.get('.v-btn').click()
        cy.get('.v-text-field__slot').first().type(albumname) 
        cy.get(':nth-child(5) > .v-input__control > .v-input__slot').type('No copy right, just do whatever you want i do not care')
        const filename='meow.png' //to upload for the cover photo
        cy.get('[type="file"]').attachFile(filename);
        cy.get('.success--text > .v-btn__content').click()
        cy.wait(10000)
        cy.contains(albumname)
        cy.log('Actual Result:The created album is added');
        cy.log('SUCESS');

    })

        it('Delete an Album', function () {
        cy.log('steps: 1-Go to my artist accoung 2-Go to my albums 3-Delete the previously created album 4-Assert it is Deleted');
        cy.log('Expected Result:The album is not there anymore');
        const albumname='Anime'
        cy.contains("Go to Symphonia Artist").click()
        cy.get('[href="/SymphoniaArtist/5e8137aa54660672fd699882/albums"] > .v-list-item__icon > .v-icon').click()
        cy.contains(albumname).click()
        cy.get('[title="delete album"] > .v-btn__content > .v-icon').click()
        cy.contains('Delete '+ albumname+ '?')
        cy.get('.error--text').click()
        cy.contains(albumname).should('not.visible');
        cy.log('Actual Result:The album is not there anymore');
        cy.log('SUCESS');
    })
    
    it('Edit an Album', function () {
        cy.log('steps: 1-Go to my artist accoung 2-Go to my albums 3-Edit the first album 4-Assert it is Edited');
        cy.log('Expected Result:The album name is changed');
        const NewAlbumName='The Fast Rush'
        cy.contains("Go to Symphonia Artist").click()
        cy.get('[href="/SymphoniaArtist/5e8137aa54660672fd699882/albums"] > .v-list-item__icon > .v-icon').click()
        cy.get('.v-list-group__header > .v-list-item__content > .v-list-item__title').first().invoke('text').then(function (OldAlbumName) {
        cy.get('.v-list-group__header').first().click()
        cy.get('[title="edit album name"]').click()
        cy.get('.v-input__control').type(NewAlbumName)
        cy.get('.success--text > .v-btn__content').click()
        cy.contains(NewAlbumName).should('be.visible');
        cy.log('Actual Result:The album name is changed');
        cy.log('SUCESS');
        /////now change it back
        cy.get('.v-list-group__header').first().click()
        cy.get('[title="edit album name"]').click()
        cy.get('.v-input__control').type(OldAlbumName)
        cy.get('.success--text > .v-btn__content').click()
        cy.contains(OldAlbumName).should('be.visible');
        cy.log('Actual Result:The album name is changed');
        cy.log('SUCESS');
      });
      

    })
    

    it('Visit an Album', function () {
      cy.log('steps: 1-Go to my artist accoung 2-Go to my albums 3-Visit the first album 4-Assert it is Visited');
      cy.log('Expected Result:The album is ready to be played');
      cy.contains("Go to Symphonia Artist").click()
      cy.get('[href="/SymphoniaArtist/5e8137aa54660672fd699882/albums"] > .v-list-item__icon > .v-icon').click()
      cy.get('.v-list-group__header > .v-list-item__content > .v-list-item__title').first().invoke('text').then(function (AlbumName) {
      cy.get('.v-list-group__header').first().click()
      cy.get('[title="visit album"]').click()
      cy.contains(AlbumName).should('exist')
      cy.get('#playBtn').should('exist')
      cy.log('Actual Result:The album is ready to be played');
      cy.log('SUCESS');

    });

  }) 
   

    



})