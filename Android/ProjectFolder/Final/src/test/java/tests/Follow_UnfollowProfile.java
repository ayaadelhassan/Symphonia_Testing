package tests;

import org.testng.Assert;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;

public class Follow_UnfollowProfile extends BaseClass{

	public String ProfileName= "Aya Adel";
	public String CountBefore="";
	public String CountAfter="";

	 @Test(priority=1)
	  public  void FollowAProfile() throws InterruptedException {
		   Thread.sleep(15000);
		   test = extent.createTest("Follow A Profile", "Search for a profile and follow him/her");
		   ReachProfile();
           driver.findElementById("com.spotify.music:id/follow_button").click();
           MobileElement Home = driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Home\"]");
           Home.click();
           Thread.sleep(2000);
           MobileElement Settings= driver.findElementByAccessibilityId("Settings");
           Settings.click();
           Thread.sleep(2000);
           driver.findElementById("android:id/icon").click();
           Thread.sleep(2000);
           CountBefore = driver.findElementById("com.spotify.music:id/following_count").getText();
           Thread.sleep(2000);
           driver.findElementById("com.spotify.music:id/following_layout").click();
           Thread.sleep(2000);
           MobileElement Name= driver.findElementById("android:id/text1");
           String ProfileNameFollowed = Name.getText();
           Thread.sleep(2000);
           Assert.assertEquals(ProfileName, ProfileNameFollowed);
           
          
	  }
	 
	 @Test(priority=2)
	  public  void UnFollowAProfile() throws InterruptedException {
			test = extent.createTest("Unfllow A Profile", "Search for a profile and unfollow him/her");
			ReachProfile();
			Thread.sleep(4000);
			Thread.sleep(2000);
            MobileElement unfollow= driver.findElementById("com.spotify.music:id/follow_button");
            unfollow.click();
            Thread.sleep(2000);
			CountAfter = driver.findElementById("com.spotify.music:id/following_count").getText();
			Thread.sleep(2000);
			Assert.assertNotEquals(CountBefore, CountAfter);
	  }
	 
	 public void ReachProfile() throws InterruptedException {
		 
		    MobileElement search=driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Search\"]");
			search.click();
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/find_search_field").click();
			Thread.sleep(2000);
			driver.findElementByAccessibilityId("Search query").sendKeys(ProfileName);
			Thread.sleep(2000);
			String type = driver.findElementById("android:id/text2").getText();
			Assert.assertEquals(type,"Profile");
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/row_view").click();
			Thread.sleep(2000);
			String Name= driver.findElementById("com.spotify.music:id/profile_title").getText();
			Assert.assertEquals(Name, ProfileName);
            Thread.sleep(2000);
		 
		 
	 }
	
	
}
