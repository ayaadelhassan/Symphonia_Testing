package tests;
import static org.testng.Assert.assertFalse;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class RemovePhoto extends BaseClass {
	public  RemovePhoto () {}

	MobileElement settings;
	MobileElement profile;
	MobileElement editProfile;
	MobileElement Picture;
	MobileElement Name;
	MobileElement Save;
	funs f= new funs();


	


	

// save removed : /hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button

	
	@Test
	void RemovePhoto() throws InterruptedException 
	{
		test = extent.createTest("Removing current profile picture");
		f.PrepareToEdit();
		Picture=driver.findElement(By.id("com.spotify.music:id/edit_image"));
		Picture.click();
	    Thread.sleep(1000); 
		MobileElement remove=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[3]"));
	    remove.click();
	    Thread.sleep(5000);
	    MobileElement save = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button"));
		save.click();
	    Thread.sleep(4000); 
	    editProfile=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button"));
		editProfile.click();
		Thread.sleep(2000); 
		Picture=driver.findElement(By.id("com.spotify.music:id/edit_image"));
	    Picture.click();
		Thread.sleep(1000);
		 remove=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[3]"));
	    assertFalse(remove.isEnabled());
		//choose :  /hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[1]
	}
}
