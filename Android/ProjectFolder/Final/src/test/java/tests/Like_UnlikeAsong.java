package tests;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;
import io.appium.java_client.MobileElement;
public class Like_UnlikeAsong extends BaseClass { 

	 @Test(priority=1)
	  public  void LikeAsong() throws InterruptedException {
		    Thread.sleep(9000);
			test = extent.createTest("Liking a song", "Going to a playlist and adding a song to my liked songs");
	    	MobileElement song = driver.findElement(By.id("com.spotify.music:id/image" ));
	    	song.click();
	    	Thread.sleep(3000);
		    driver.findElementByXPath("(//android.widget.ImageButton[@content-desc=\"Like this song\"])[1]").click();
		    String xmlFormat = driver.getPageSource();
		    if(xmlFormat.contains("Added to Liked Songs")){
		    System.out.println("Toast appeared correctly");
		   

		    }
		    Thread.sleep(3000);
		    driver.findElementByXPath("(//android.widget.ImageButton[@content-desc=\"Like this song\"])[2]").click();
		    String xmlFormat2 = driver.getPageSource();
		    if(xmlFormat2.contains("Added to Liked Songs")){
		    System.out.println("Toast appeared correctly");
		   

		    }
	  }
	
	 @Test(priority=2)
	  public  void UnlikeAsong() throws InterruptedException {
			test = extent.createTest("Unliking a song", "Going to a playlist and unlike a song");
		   Thread.sleep(2000);
		    driver.findElementByXPath("(//android.widget.ImageButton[@content-desc=\"Stop liking this song\"])[1]").click();
		    String xmlFormat = driver.getPageSource();
		    if(xmlFormat.contains("Removed from Liked Songs")){
		    System.out.println("Toast appeared correctly");
		  }
		    Thread.sleep(2000);
		    driver.findElementByXPath("(//android.widget.ImageButton[@content-desc=\"Stop liking this song\"])[2]").click();
		    String xmlFormat2 = driver.getPageSource();
		    if(xmlFormat2.contains("Removed from Liked Songs")){
		    System.out.println("Toast appeared correctly");
		  }
	 
	 }
	 
	 @Test(priority=3)
	 public void SearchForAsongAndLikeit() throws InterruptedException {
		     test = extent.createTest("liking a song test case 2", "Search for a song, add it and assert it's added to my liked songs list");
		     String SongName="How Long";
		     Thread.sleep(2000);
			 MobileElement SearchIcon = driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Search\"]");
			 SearchIcon.click();
			 Thread.sleep(2000);
			 driver.findElementById("com.spotify.music:id/find_search_field").click();
			 Thread.sleep(1000);
			 driver.findElementById("com.spotify.music:id/query").sendKeys(SongName);
			 Thread.sleep(500);
			 driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]").click();
		     Thread.sleep(2000);
		     driver.findElementByXPath("(//android.widget.ImageButton[@content-desc=\"Like\"])[1]").click();
		     String xmlFormat = driver.getPageSource();
		    if(xmlFormat.contains("Added to Liked Songs")){
		    System.out.println("Toast appeared correctly");
		   }
		    ////now asserting that it's added in my liked songs list
			MobileElement LibraryIcon = driver.findElementByXPath("//android.widget.ImageView[@content-desc=\"Your Library\"]");
	        LibraryIcon.click();
	        Thread.sleep(2000);
	        driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]").click();
			Thread.sleep(2000);
	        MobileElement song= driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView[1]");
	        String text= song.getText();
	        Assert.assertEquals(SongName, text);
	
	 }
	 

}
