const expectPlayingAudio = () => {
    cy.get('.sound-player').should((els)=>{
      let audible = false
      els.each((i, el)=>{
        console.log(el)
        console.log(el.duration, el.paused, el.muted)
        if (el.duration > 0 && !el.paused && !el.muted) {
          audible = true
        }
      })
      expect(audible).to.eq(false)
    })
  }
  
describe('Music Player Features', function () {

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
        cy.get('#5edf5a442aa9b365682e46f9').click()
       })


    it('play a song', function () {
        cy.log('steps: 1-open a random song 2-press the play button 3- asserting that the first song in the album is indeed the song playing');
        cy.log('Expected Result:the first song in the album is playing');
        cy.get('#playBtn').click();
        cy.wait(5000)
        cy.get('#playPause').click(); 
        cy.get('.v-list-item__title.draweritem.playing').first().invoke('text').then(function (text1) {
        cy.get('.song-name').invoke('text').should(function (text2) {
            expect(text1).to.have.string(text2);
        });
        });
        cy.log('Actual Result:the first song in the album is playing');
        cy.log('SUCESS');        
    })


    it('Play and Pause', function () {
        cy.log('steps: 1-open a random song 2-press the play button 4-press the pause button 3- asserting that the song is not playing anymore');
        cy.log('Expected Result:the song is not playing');
        cy.wait(2000);
        cy.get('#playPause').click();
        cy.wait(1000);
        cy.get('#playPause').click();
        expectPlayingAudio(); //asserting that the song is not playing
        cy.log('Actual Result:the song is not playing');
        cy.log('SUCESS');
    })

    it('Next and Previous Button', function () {
        cy.log('steps: 1-open a random song 2-press the play button 4-press the next button 3- asserting the song changed');
        cy.log('Expected Result:the next song is playing');
        cy.wait(15000);
        cy.get('#playBtn').click();
        cy.get('.song-name').first().invoke('text').then(function (text1) {
          cy.wait(15000)
          cy.get('#next').click();
          cy.wait(15000);
          cy.get('.song-name').invoke('text').should(function (text2) {
            expect(text1).not.to.have.string(text2);
          });
        });
          cy.get('.v-list-item__title.draweritem.playing').first().invoke('text').then(function (text1) {
          cy.get('.song-name').invoke('text').should(function (text2) {
            expect(text1).to.have.string(text2);
          });
        });
        cy.log('Actual Result:the next song is playing');
        cy.log('SUCESS'); 
        ////////////////////////////////////////////////////
        cy.log('steps: 1-Press the previous button 2- asserting that the song is changed ');
        cy.log('Expected Result:the previous song is playing');
        cy.get('.song-name').first().invoke('text').then(function (text1) {
          cy.wait(15000)
          cy.get('#previous').click({force: true});
          cy.wait(15000);
          cy.get('.song-name').invoke('text').should(function (text2) {
            expect(text1).not.to.have.string(text2);
          });
        });
        cy.log('Actual Result:the previous song is changed playing');
        cy.log('SUCESS');
    })





})