package tests;
import static org.testng.Assert.assertFalse;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class EmptyName extends BaseClass{
	public EmptyName()
	{}
	
	MobileElement settings;
	MobileElement profile;
	MobileElement editProfile;
	MobileElement Picture;
	MobileElement Name;
	MobileElement Save;
	funs f= new funs();
	
	@Test
	void EmptyName() throws InterruptedException 
	{
		f.PrepareToEdit();
		test = extent.createTest("Trying to make empty name");
		Name=driver.findElement(By.id("com.spotify.music:id/edit_displayname"));
		Thread.sleep(500); 
		Name.clear();
		Save=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button"));
        assertFalse(Save.isEnabled());
	}

}
