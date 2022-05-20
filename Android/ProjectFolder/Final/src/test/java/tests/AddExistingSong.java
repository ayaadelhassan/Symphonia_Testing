package tests;
import static org.testng.Assert.assertTrue;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class AddExistingSong extends BaseClass {
	
public AddExistingSong() {}

	
	MobileElement song ;
	MobileElement Selectedsong ;
	MobileElement searchbox;
	String SongName;
	String PlaylistName1="testy";
	String PlaylistName2="NewNew";
	funs f= new funs();
	
    
	
	
	
	
	@Test
	void test22_AddExistingSong() throws InterruptedException 
	{
		test = extent.createTest("Adding a song to a playlist ( searching for a song that already extists - trying to add it - making sure it's recognized)");
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
		
		MobileElement addSong =driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.FrameLayout[1]/android.widget.Button"));
		addSong.click();
		Thread.sleep(2000);
		MobileElement Playlist1=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]"));
		Playlist1.click();
		Thread.sleep(3000);
		assertTrue(driver.findElement(By.className("android.widget.LinearLayout")).isDisplayed());
		
		
	}

}
