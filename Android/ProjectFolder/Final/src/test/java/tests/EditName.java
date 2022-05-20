package tests;
import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class EditName extends BaseClass {
	public EditName()
	{}
	
	MobileElement settings;
	MobileElement profile;
	MobileElement editProfile;
	MobileElement Picture;
	MobileElement Name;
	MobileElement Save;
	funs f= new funs();

	@Test
	void EditName() throws InterruptedException 
	{
		
		test = extent.createTest("editing user name");
		f.PrepareToEdit();
		Name=driver.findElement(By.id("com.spotify.music:id/edit_displayname"));
		Thread.sleep(500); 
		Name.clear();
		Name.sendKeys("Julin");
		Thread.sleep(500); 
		Save=driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button"));
		Save.click();
		Thread.sleep(3000); 
		String NewName= driver.findElement(By.id("com.spotify.music:id/profile_title")).getText();
		
        assertEquals("Julin",NewName);
        MobileElement back = driver.findElement(By.xpath("//android.widget.ImageButton[@content-desc=\"Back\"]"));
        back.click();
        Thread.sleep(3000); 
        back.click();

	}
	
}
