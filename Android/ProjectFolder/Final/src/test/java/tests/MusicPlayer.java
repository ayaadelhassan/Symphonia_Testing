package tests;
import org.openqa.selenium.By;

import org.testng.annotations.Test;
import io.appium.java_client.MobileElement;
import org.testng.Assert;

public class MusicPlayer extends BaseClass{
	
	 @Test(priority=1)
	public void PlayaSong() throws InterruptedException {
		Thread.sleep(15000);
		test = extent.createTest("Play a song", "Going to a playlist, choose a song and play it");
	    MobileElement song = driver.findElement(By.id("com.spotify.music:id/image"));
	    song.click();
	    Thread.sleep(3000);
	    MobileElement SongNameClicked = driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout[1]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]");
	    SongNameClicked.click();
	    String SongClicked = SongNameClicked.getText();
	    System.out.println(SongClicked);
	  	driver.findElementById("com.spotify.music:id/playlist_item").click();
	  	Thread.sleep(2000);
		String SongPlayed=driver.findElementById("com.spotify.music:id/track_title").getText();
	    System.out.println(SongPlayed);
	    Assert.assertTrue(SongPlayed.contains(SongClicked));
	    Thread.sleep(2000);
		driver.findElementById("com.spotify.music:id/play_pause_button").click();
	}
	 
	 @Test(priority=2)
		public void NextButton() throws InterruptedException {
			test = extent.createTest("The 'Next' Button", "In the Music player, press the next button and assert that the next song is playing");
			driver.findElementById("com.spotify.music:id/now_playing_bar_layout").click();
			Thread.sleep(2000);
			String CurrentSong=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
			Thread.sleep(1000);
			driver.findElementById("com.spotify.music:id/next_button").click();
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/play_pause_button").click();
			Thread.sleep(2000);
			String NextSong=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
            Assert.assertNotEquals(NextSong, CurrentSong);
			
		}
	 
	 @Test(priority=3)
		public void PreviousButton() throws InterruptedException {
			test = extent.createTest("The 'Previous' Button", "In the Music player, press the previous button and assert that the previous song is playing");
			Thread.sleep(2000);
			String CurrentSong=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
			Thread.sleep(1000);
			driver.findElementById("com.spotify.music:id/previous_button").click();
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/play_pause_button").click();
			Thread.sleep(2000);
			String PrevSong=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
         Assert.assertNotEquals(PrevSong, CurrentSong);
			
		}

	 @Test(priority=4)
		public void LikeASong() throws InterruptedException {
			test = extent.createTest("Add a song to the liked songs", "In the Music player, press the Heart icon and assert that the song is added to the liked songs");
			Thread.sleep(2000);
            MobileElement Heart=driver.findElementByAccessibilityId("Like");
            Heart.click();
            Thread.sleep(2000);
            MobileElement Unlike=driver.findElementByAccessibilityId("Unlike");
            Assert.assertNotNull(Unlike);
		}


	 @Test(priority=5)
		public void UnlikeASong() throws InterruptedException {
			test = extent.createTest("Remove a song from the liked songs", "In the Music player, press the unlike icon and assert that the song is removed from the liked songs");
            Thread.sleep(2000);
            MobileElement Unlike=driver.findElementById("com.spotify.music:id/heart_button");
            Unlike.click();
            Thread.sleep(2000);
            MobileElement Heart=driver.findElementByAccessibilityId("Like");
            Assert.assertNotNull(Heart);
		}
	 

	 @Test(priority=6)
		public void HideASong() throws InterruptedException {
			test = extent.createTest("Hide a song to stop it from playing in the playlist", "In the Music player, press the Hide icon and assert that the song is hidden");
            Thread.sleep(2000);
            MobileElement Hide=driver.findElementByAccessibilityId("Don't play this");
            Hide.click();
            Thread.sleep(2000);
			String CurrentSong1=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
            MobileElement prev=driver.findElementByAccessibilityId("Previous");
            prev.click();
            Thread.sleep(2000);
			String CurrentSong2=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
            Assert.assertEquals(CurrentSong1, CurrentSong2);
		}
	 
	 @Test(priority=7)
		public void UnHideASong() throws InterruptedException {
		 test = extent.createTest("UnHide a song", "In the Music player, press the UnHide icon and assert that the song is not hidden anymore");
         Thread.sleep(2000);
         MobileElement Docker=driver.findElementByAccessibilityId("Close");
         Docker.click();
         Thread.sleep(2000);
         MobileElement Unhide=driver.findElementByAccessibilityId("Allow to play this song");
         Unhide.click();
         Thread.sleep(2000);
		 driver.findElementById("com.spotify.music:id/now_playing_bar_layout").click();
		 Thread.sleep(2000);
		 String CurrentSong1=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
         MobileElement prev=driver.findElementByAccessibilityId("Previous");
         prev.click();
         Thread.sleep(2000);
		 String CurrentSong2=driver.findElementById("com.spotify.music:id/marquee_track_info_view_title").getText();
         Assert.assertNotEquals(CurrentSong1, CurrentSong2);
         
		}
}

