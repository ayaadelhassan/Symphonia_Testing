describe('Queue features', function () {

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
        cy.Login('testemail@gmail.com','123456789')
        cy.wait(5000)
        cy.get('#5edf5a442aa9b365682e46f9').click()
        cy.get('#playBtn').click()
        cy.wait(10000)
        cy.get('#playPause').click()
       })


    it('Add Songs Of a Playlist to The Queue', function () {
        cy.log('steps: 1-open a random playlist  2-Add all the songs int it to the queue 3-asserting');
        cy.log('Expected Result: All the songs are added successfully');
        cy.get('.col-lg-8 > .v-list > :nth-child(1)').children().its('length').then(NumberOfSongsInPlaylist => {
        cy.get('#queue').click()
        cy.wait(5000)
        cy.get(':nth-child(3) > .col-sm-12 > .v-list').children().its('length').then(NumberOfSongsInQueue => {     
        expect(NumberOfSongsInPlaylist).to.eq(NumberOfSongsInQueue+1) //the +1 is for the song that's currently playing
        })
        cy.log('Actual Result:The songs are added successfully')
        cy.log('SUCESS')   
  
        })


     
    })

   

  



})