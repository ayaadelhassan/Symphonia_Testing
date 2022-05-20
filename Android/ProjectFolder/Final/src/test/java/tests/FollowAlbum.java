package tests;
import org.testng.annotations.Test;
import org.testng.AssertJUnit;
import org.testng.annotations.Test;
import org.testng.AssertJUnit;
import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class FollowAlbum extends BaseClass{
	public	FollowAlbum() {}
	String AlbumName="x (Deluxe Edi" ;
	funs f = new funs();
	
	@Test
	void AddToNewPlaylist() throws InterruptedException 
	{
		test = extent.createTest("search for and ulbum and like it");
		Thread.sleep(5000); 
		MobileElement search = driver.findElement(By.id("com.spotify.music:id/search_tab"));
		search.click();
		Thread.sleep(2000); 	
		MobileElement searchbox = driver.findElement(By.id("com.spotify.music:id/find_search_field"));
		searchbox.click();
		Thread.sleep(1000); 
     	MobileElement searchtxt = driver.findElement(By.id("com.spotify.music:id/query"));
		searchtxt.sendKeys(AlbumName);
		Thread.sleep(2000); 
		MobileElement SelectedAlbum = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]"));
		SelectedAlbum.click();
		Thread.sleep(2000); 
		MobileElement Like = driver.findElement(By.xpath("//android.widget.ImageButton[@content-desc=\"Like\"]"));
		Like.click();
		Thread.sleep(2000); 
		MobileElement Library = driver.findElement(By.id("com.spotify.music:id/your_library_tab"));
		Library.click();
		Thread.sleep(4000); 
		MobileElement Album =driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout[3]/android.widget.TextView"));
		Album.click();
		Thread.sleep(2000); 
		f.scrolldown(590,900,344);
		search=driver.findElement(By.id("com.spotify.music:id/edit_text_filter"));
        search.sendKeys(AlbumName);
        Thread.sleep(2000);
		String AlbumAdded =driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]")).getText();
		AssertJUnit.assertEquals(AlbumAdded,"x (Deluxe Edition)");
	}
	
	
	
	
	
	

}
