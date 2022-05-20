package tests;
import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class UnFollowAlbum extends BaseClass {
	public	UnFollowAlbum() {}
	String AlbumName="x (Deluxe Edition)" ;
	funs f = new funs();
	
	@Test
	void AddToNewPlaylist() throws InterruptedException 
	{
		test = extent.createTest("search for an album in the library and unlike it");
		Thread.sleep(4000); 
		MobileElement Library = driver.findElement(By.id("com.spotify.music:id/your_library_tab"));
		Library.click();
		Thread.sleep(4000); 
		MobileElement Album =driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout[3]/android.widget.TextView"));
		Album.click();
		Thread.sleep(2000); 
		f.scrolldown(590,900,344);
		MobileElement search=driver.findElement(By.id("com.spotify.music:id/edit_text_filter"));
        search.sendKeys(AlbumName);
        Thread.sleep(2000);
		String AlbumAdded =driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]")).getText();
		assertEquals(AlbumAdded,AlbumName);
		MobileElement SelectedAlbum = driver.findElement(By.id("com.spotify.music:id/row_view"));
		SelectedAlbum.click();
		Thread.sleep(2000); 
		MobileElement unLike = driver.findElement(By.xpath("//android.widget.ImageButton[@content-desc=\"Unlike\"]"));
		unLike.click();
		Thread.sleep(2000); 
		MobileElement back = driver.findElement(By.xpath("//android.widget.ImageButton[@content-desc=\"Back\"]"));
        back.click();
        Thread.sleep(3000); 
        search.clear();
        search.sendKeys(AlbumName);
        assertEquals(driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]")).getText(),"No result found");
		
		
		
	}
	
}
