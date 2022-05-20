package tests;
import org.testng.Assert;
import org.testng.annotations.Test;
import io.appium.java_client.MobileElement;
public class Follow_UnfollowArtist2 extends BaseClass {
	public String ArtistName= "Niall Horan";
	 @Test(priority=1)
	  public  void FollowAnArtist_Search() throws InterruptedException {
		    Thread.sleep(9000);
			test = extent.createTest("Follow An Atrist", "Search for an artist and follow him/her");
			ReachArtist();
            driver.findElementById("com.spotify.music:id/actionbar_item_follow").click();
            boolean toast=false;
            String xmlFormat = driver.getPageSource();
		    if(xmlFormat.contains("Ok, you're following " + ArtistName )){
		       toast=true;
		    }
		    Assert.assertTrue(toast);
	  }
	 
	 @Test(priority=2)
	  public  void UnFollowAnArtist_Search() throws InterruptedException {
			test = extent.createTest("Unfllow An Atrist", "Search for an artist and unfollow him/her");
			ReachArtist();
			Thread.sleep(4000);
          MobileElement unfollow= driver.findElementById("com.spotify.music:id/actionbar_item_follow");
          unfollow.click();
           Thread.sleep(2000);
           boolean toast=false;
           String xmlFormat = driver.getPageSource();
		    if(xmlFormat.contains("Ok, you've stopped following " + ArtistName )){
		       toast=true;
		    }
		    Assert.assertTrue(toast);
	  }
	 
	 public void ReachArtist() throws InterruptedException {
		 
		 MobileElement search=driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Search\"]");
			search.click();
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/find_search_field").click();
			Thread.sleep(2000);
			driver.findElementByAccessibilityId("Search query").sendKeys(ArtistName);
			Thread.sleep(2000);
			String type = driver.findElementById("android:id/text2").getText();
			Assert.assertEquals(type,"Artist");
			Thread.sleep(2000);
			driver.findElementById("com.spotify.music:id/row_view").click();
			Thread.sleep(2000);
			String Name= driver.findElementById("com.spotify.music:id/txt_title").getText();
			Assert.assertEquals(Name, ArtistName);
            Thread.sleep(2000);
		 
		 
	 }

}
