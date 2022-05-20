package tests;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;
import junit.framework.Assert;

public class Queue extends BaseClass {
	
	@Test(priority=1)
	public void PlayaSong() throws InterruptedException {
		Thread.sleep(15000);
		test = extent.createTest("Play songs in a playlist", "Playing songs in the same order as they are in the playlist");
	    MobileElement song = driver.findElement(By.id("com.spotify.music:id/image"));
	    song.click();
	    Thread.sleep(3000);
	    MobileElement Play= driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.Button");
	    Play.click();
	    Thread.sleep(3000);
	    Play.click();
	    Thread.sleep(3000);
	    MobileElement FirstSong = driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout[1]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]");
	    String FirstSongName= FirstSong.getText();
	    System.out.println(FirstSongName);
	    Thread.sleep(2000);
	    MobileElement SecondSong = driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout[1]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[3]/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]");
	    String SecondSongName= SecondSong.getText();
	    System.out.println(SecondSongName);
	    Thread.sleep(2000);
		driver.findElementById("com.spotify.music:id/now_playing_bar_layout").click();
		Thread.sleep(2000);
		MobileElement FirstPlaying= driver.findElementById("com.spotify.music:id/marquee_track_info_view_title");
		String FirstPlayingName= FirstPlaying.getText();
	    System.out.println(FirstPlayingName);
		Thread.sleep(2000);
		driver.findElementByAccessibilityId("Next").click();
		Thread.sleep(2000);
		driver.findElementByAccessibilityId("Pause").click();
	    Thread.sleep(2000);
		MobileElement SecondPlaying= driver.findElementById("com.spotify.music:id/marquee_track_info_view_title");
		String SecondPlayingName= SecondPlaying.getText();
	    System.out.println(SecondPlayingName);
		Thread.sleep(2000);
		Assert.assertEquals(FirstSongName, FirstPlayingName);
		Assert.assertEquals(SecondSongName, SecondPlayingName);

	}

}
