package tests;
import static org.testng.Assert.assertTrue;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.offset.PointOption;

public class TakePhoto extends BaseClass {
	
	public TakePhoto() {}
	
	MobileElement settings;
	MobileElement profile;
	MobileElement editProfile;
	MobileElement Picture;
	MobileElement Name;
	MobileElement Save;
	funs f= new funs();

	
	@Test
	void TakePhoto() throws InterruptedException 
	{
		test = extent.createTest("changing photo by taking a photo with the camera");
		f.PrepareToEdit();
		Picture=driver.findElement(By.id("com.spotify.music:id/edit_image"));
		Picture.click();
	    Thread.sleep(1000); 
	    MobileElement takePic = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[2]"));
	    takePic.click();
	    Thread.sleep(5000);
		MobileElement camera = driver.findElement(By.id("com.oppo.camera:id/shutter_button"));
		camera.click();
		Thread.sleep(6000);
		
		TouchAction t= new TouchAction(driver);
		t.tap(new PointOption().withCoordinates(643, 1222));
		t.perform();
	    Thread.sleep(6000); 
	    MobileElement usePic=driver.findElement(By.id("com.spotify.music:id/btn_use_photo"));
	    usePic.click();
	    Thread.sleep(3000); 
	    MobileElement save = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button"));
		save.click();
	    Thread.sleep(4000); 
	    editProfile=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button"));
		editProfile.click();
		Thread.sleep(2000); 
		Picture=driver.findElement(By.id("com.spotify.music:id/edit_image"));
	    Picture.click();
		Thread.sleep(1000);
		MobileElement remove=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[3]"));
	    assertTrue(remove.isEnabled());
	}
	

}
