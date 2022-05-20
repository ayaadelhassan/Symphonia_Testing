package tests;
import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class SongToExistingPlaylist extends BaseClass{
	
public SongToExistingPlaylist() {}

	
	MobileElement song ;
	MobileElement Selectedsong ;
	MobileElement searchbox;
	String SongName;
	String PlaylistName1="testy";
	String PlaylistName2="NewNew";
	funs f= new funs();
	
    
	
	
	
	
	@Test
	void AddSong() throws InterruptedException 
	{
		test = extent.createTest("Adding a song to a playlist (creating a playlist - searching for a song - adding it - making sure it's in the playlist)");
		Thread.sleep(5000); 
		MobileElement Library = driver.findElement(By.id("com.spotify.music:id/your_library_tab"));
		Library.click();
		Thread.sleep(4000); 
		MobileElement createPlaylist = driver.findElement(By.id("com.spotify.music:id/row_view"));
		createPlaylist.click();
		Thread.sleep(3000); 
		MobileElement PlaylistNameElement = driver.findElement(By.id("com.spotify.music:id/edit_text"));
		PlaylistNameElement.sendKeys(PlaylistName1);
		Thread.sleep(2000);
		MobileElement create = driver.findElement(By.id("com.spotify.music:id/continue_button"));
		create.click();
		Thread.sleep(4000);  
		MobileElement search = driver.findElement(By.id("com.spotify.music:id/search_tab"));
		search.click();
		Thread.sleep(2000); 		
		MobileElement searchbox = driver.findElement(By.id("com.spotify.music:id/find_search_field"));
		searchbox.click();
		Thread.sleep(1000); 
     	MobileElement searchtxt = driver.findElement(By.id("com.spotify.music:id/query"));
		searchtxt.sendKeys("The Way You Look Tonight");
		Thread.sleep(2000); 
		Selectedsong=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]"));
		Selectedsong.click();
		SongName="The Way You Look Tonight";
		Thread.sleep(2000); 
		//MobileElement Playlist = driver.findElement(By.className("android.widget.ImageButton"));
		//Thread.sleep(2000); 
		MobileElement addSong =driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.FrameLayout[1]/android.widget.Button"));
		addSong.click();
		Thread.sleep(2000);
		MobileElement Playlist1=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]"));
		Playlist1.click();
		Thread.sleep(3000);
		f.getToPlaylist(PlaylistName1);
		Thread.sleep(1000);
		MobileElement added=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[3]/android.widget.LinearLayout"));
		added.click();
		Thread.sleep(2000);
		String songAdded=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]")).getText();
		assertEquals(songAdded,SongName);
	}

}
