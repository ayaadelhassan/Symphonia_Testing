package tests;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;
import io.appium.java_client.MobileElement;

public class Follow_UnfollowArtist1 extends BaseClass {
	
	
	 @Test(priority=1)
	  public  void FollowAnArtist() throws InterruptedException {
		    Thread.sleep(9000);
			test = extent.createTest("Follow An Atrist", "Going to a playlist, choose a song and follow its singer");
		    MobileElement song = driver.findElement(By.id("com.spotify.music:id/image" ));
		    song.click();
		    Thread.sleep(3000);
		  	driver.findElementById("com.spotify.music:id/playlist_item").click();
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/play_pause_button").click();
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/now_playing_bar_layout").click();
			Thread.sleep(2000);
			MobileElement Artist=driver.findElementById("com.spotify.music:id/marquee_track_info_view_subtitle");
			String Name1= Artist.getText();
			Artist.click();
			Thread.sleep(8000);
			MobileElement follow= driver.findElementById("com.spotify.music:id/actionbar_item_follow");
			follow.click();
			String xmlFormat = driver.getPageSource();
		    if(xmlFormat.contains("Ok, you're following" + driver.findElementById("com.spotify.music:id/txt_title").getText() )){
		    System.out.println("Toast appeared correctly");
		    }
		    Thread.sleep(2000);
			driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Your Library\"]").click();
			Thread.sleep(2000);
			driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout[2]").click();
			Thread.sleep(3000);
			String Name=driver.findElementById("android:id/text1").getText();
		    Assert.assertEquals(Name, Name1);
			
			  
	  }
	 @Test(priority=2)
	 public void UnfollowArtist() throws InterruptedException {
	      test = extent.createTest("Unfollow An Atrist", "Going to a playlist, choose a song and unfollow its singer");
		  driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Home\"]").click();
		  MobileElement song = driver.findElement(By.id("com.spotify.music:id/image" ));
	      song.click();
	      Thread.sleep(3000);
	  	  driver.findElementById("com.spotify.music:id/playlist_item").click();
		  Thread.sleep(2000);
		  driver.findElementById("com.spotify.music:id/play_pause_button").click();
		  Thread.sleep(2000);
		  driver.findElementById("com.spotify.music:id/now_playing_bar_layout").click();
		  Thread.sleep(2000);
		  MobileElement Artist=driver.findElementById("com.spotify.music:id/marquee_track_info_view_subtitle");
		  String Name1= Artist.getText();
		  Artist.click();
		  Thread.sleep(8000);
		  MobileElement unfollow= driver.findElementById("com.spotify.music:id/actionbar_item_follow");
		  unfollow.click();
		  String xmlFormat = driver.getPageSource();
		  if(xmlFormat.contains("Ok, you've stopped following " + driver.findElementById("com.spotify.music:id/txt_title").getText() )){
		    System.out.println("Toast appeared correctly");
		    }   
		  Thread.sleep(2000);
		  driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Your Library\"]").click();
		  Thread.sleep(2000);
		  driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout[2]").click();
		  String Name=driver.findElementById("android:id/text1").getText();
		  Assert.assertNotEquals(Name, Name1);
		 
	 }
	 
}
