package tests;
import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class AddSong extends BaseClass {
	
	public AddSong () {}
	MobileElement song ;
	MobileElement Selectedsong ;
	MobileElement searchbox;
	String SongName;
	String PlaylistName1="testy";
	String PlaylistName2="NewNew";
	funs f= new funs();
	
	@Test
	void AddToNewPlaylist() throws InterruptedException 
	{
		test = extent.createTest("Adding a song to a playlist (searching for a song - creating a playlist for it - adding it - making sure it's in the playlist)");
		Thread.sleep(5000); 
		MobileElement search = driver.findElement(By.id("com.spotify.music:id/search_tab"));
		search.click();
		Thread.sleep(2000); 	
		SongName="The Way You Look Tonight";
		MobileElement searchbox = driver.findElement(By.id("com.spotify.music:id/find_search_field"));
		searchbox.click();
		Thread.sleep(1000); 
     	MobileElement searchtxt = driver.findElement(By.id("com.spotify.music:id/query"));
		searchtxt.sendKeys(SongName);
		Thread.sleep(2000); 
		Selectedsong=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]"));
		Selectedsong.click();
		Thread.sleep(2000); 
		MobileElement addSong =driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.FrameLayout[1]/android.widget.Button"));
		addSong.click();
		Thread.sleep(2000);
		MobileElement NewPlaylist=driver.findElement(By.id("com.spotify.music:id/add_to_playlist_create_button"));
		NewPlaylist.click();
		Thread.sleep(3000);
		MobileElement PlaylistNameElement = driver.findElement(By.id("com.spotify.music:id/edit_text"));
		PlaylistNameElement.sendKeys(PlaylistName2);
		Thread.sleep(2000);
		MobileElement create = driver.findElement(By.id("com.spotify.music:id/continue_button"));
		create.click();
		Thread.sleep(4000);  
		f.getToPlaylist(PlaylistName2);
		Thread.sleep(1000);
		MobileElement added=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[3]/android.widget.LinearLayout"));
		added.click();
		Thread.sleep(2000);
		String songAdded=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]")).getText();
		assertEquals(songAdded,SongName);
	}
	
	
	

}
