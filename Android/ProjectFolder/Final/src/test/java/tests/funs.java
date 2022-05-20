package tests;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;

import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;

public class funs extends BaseClass{
	

	
	void getToPlaylist(String Name) throws InterruptedException 
	{
		MobileElement Library = driver.findElement(By.id("com.spotify.music:id/your_library_tab"));
		Library.click();
		Thread.sleep(4000); 
		scrolldown(590,900,344);
		Thread.sleep(1000);
		MobileElement search = driver.findElement(By.id("com.spotify.music:id/edit_text_filter"));
		search.sendKeys(Name);	
		Thread.sleep(3000);
		MobileElement Playlist = driver.findElement(By.id("com.spotify.music:id/row_view"));
		Playlist.click();
		Thread.sleep(2000);
	}
	
	
	
	public void scrolldown(int starty,int endy,int x) 
	{
		Dimension dimension= driver.manage().window().getSize();
		TouchAction t= new TouchAction(driver);
		t.press(PointOption.point(x,starty))
		.waitAction(WaitOptions.waitOptions(Duration.ofSeconds(1)))
		.moveTo(PointOption.point(x,endy)).release().perform() ;
		
	}
	
	
	public void PrepareToEdit() throws InterruptedException 
	{
		Thread.sleep(6000);
		MobileElement settings=driver.findElement(By.xpath("//android.widget.ImageButton[@content-desc=\"Settings\"]"));
		settings.click();
		Thread.sleep(2000); 
		MobileElement profile = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[3]/android.widget.ListView/android.widget.LinearLayout[2]/android.widget.LinearLayout"));
		profile.click();
		Thread.sleep(4000); 
		MobileElement editProfile = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button"));
		editProfile.click();
		Thread.sleep(2000); 
	}
	

}
