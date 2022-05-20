package tests;
import static org.testng.Assert.assertNotEquals;

import org.openqa.selenium.By;
import org.testng.AssertJUnit;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class RemoveSong extends BaseClass {

	public RemoveSong () {}
	
	MobileElement song ;
	MobileElement Selectedsong ;
	MobileElement searchbox;
	String SongName;
	String PlaylistName1="testy";
	String PlaylistName2="NewNew";
	funs f= new funs();

	
    
	
	
	@Test
	void RemoveFromPlaylist() throws InterruptedException 
	{
		test = extent.createTest("Removing a song to a playlist (goes to playlist and deletes a song- making sure it's not in the playlist)");
		SongName="The Way You Look Tonight";
		Thread.sleep(6000);  
		f.getToPlaylist(PlaylistName2);
		Thread.sleep(1000);
		MobileElement addedSongs=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[3]/android.widget.LinearLayout"));
		addedSongs.click();
		Thread.sleep(2000);
		String toRemove=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]")).getText();
		AssertJUnit.assertEquals(toRemove,SongName);
		Thread.sleep(2000);
		MobileElement dots=driver.findElement(By.xpath("(//android.widget.ImageButton[@content-desc=\"Show context menu\"])[1]"));
	    dots.click();
	    Thread.sleep(2000);
		MobileElement remove=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView[2]"));
		remove.click();
	    Thread.sleep(3000);
	    String checkRemoved=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]")).getText();
		assertNotEquals(checkRemoved,SongName);
	}
}
