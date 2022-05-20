package tests;
import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class SongFromInsidePlaylist extends BaseClass{
	
	public SongFromInsidePlaylist() {}
	
	MobileElement song ;
	MobileElement Selectedsong ;
	MobileElement searchbox;
	String SongName;
	String PlaylistName1="testy";
	String PlaylistName2="NewNew";
	funs f= new funs();
	
    
	
	
	
	@Test
	void AddFromInsideThePlaylist() throws InterruptedException 
	{
		test = extent.createTest("Adding a song to a playlist (go to a playlist that already exists - searching for a song from inside the playlist - adding it - making sure it's in the playlist)");
		Thread.sleep(6000);  
		f.getToPlaylist(PlaylistName2);
		Thread.sleep(1000);
		MobileElement addSongs=driver.findElement(By.id("com.spotify.music:id/button_primary"));
		addSongs.click();
		Thread.sleep(2000);
	    SongName = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]")).getText();
	    MobileElement add =driver.findElement(By.xpath("//android.widget.ImageButton[@content-desc=\"Add song to playlist.\"]"));
	    add.click();
	    Thread.sleep(2000);
	    MobileElement back=driver.findElement(By.xpath("//android.widget.ImageButton[@content-desc=\"Close\"]"));
	    back.click();
	    Thread.sleep(4000);
	    MobileElement added=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[3]/android.widget.LinearLayout"));
		added.click();
		Thread.sleep(2000);
		String songAdded=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]")).getText();
		assertEquals(songAdded,SongName);
		
	}
	

}
