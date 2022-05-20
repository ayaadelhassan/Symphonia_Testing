package tests;

import java.net.MalformedURLException;
import java.net.URL;


import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeTest;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.markuputils.ExtentColor;
import com.aventstack.extentreports.markuputils.MarkupHelper;
import com.aventstack.extentreports.reporter.ExtentHtmlReporter;

import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;

public class BaseClass {
	protected AndroidDriver<MobileElement> driver;
	public BaseClass() {}
	public static ExtentHtmlReporter htmlReporter;
	public static ExtentReports extent;
	public static ExtentTest test;
	
	@BeforeSuite
	public void reportSetup() 
	{

		htmlReporter = new ExtentHtmlReporter("extent.html");
		extent = new ExtentReports();
		extent.attachReporter(htmlReporter);

	}
	
	@BeforeTest
	public void setup() throws MalformedURLException, InterruptedException  {
		//i will put here any thing i want to run Before test
		
		try {
		DesiredCapabilities caps = new DesiredCapabilities();
		caps.setCapability("platformName", "ANDROID");
		caps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "9");
		caps.setCapability(MobileCapabilityType.DEVICE_NAME, "JKM-LX1");
		caps.setCapability(MobileCapabilityType.UDID, "DEFNW18C06002995");
		caps.setCapability(MobileCapabilityType.NEW_COMMAND_TIMEOUT,8000);
	    caps.setCapability(MobileCapabilityType.NEW_COMMAND_TIMEOUT,8000);
		caps.setCapability("appPackage", "com.spotify.music");
		caps.setCapability("appActivity", "com.spotify.music.MainActivity");
		caps.setCapability("autoDismissAlerts", true);


        URL url= new URL("http://127.0.0.1:4723/wd/hub");
        driver =  new AndroidDriver<MobileElement>(url,caps);
        
        
		} catch(Exception exp) {
			
			System.out.println("Cause is : " + exp.getCause());
			System.out.println("Message is : " +exp.getMessage());
			exp.printStackTrace();
		}
	}
	
	
	@AfterMethod
    public void getResult(ITestResult result)
    {
        if(result.getStatus() == ITestResult.FAILURE)
        {
            test.log(Status.FAIL, MarkupHelper.createLabel(result.getName()+" Test case FAILED due to below issues:", ExtentColor.RED));
            test.fail(result.getThrowable());
        }
        else if(result.getStatus() == ITestResult.SUCCESS)
        {
            test.log(Status.PASS, MarkupHelper.createLabel(result.getName()+" Test Case PASSED", ExtentColor.GREEN));
        }
        else
        {
            test.log(Status.SKIP, MarkupHelper.createLabel(result.getName()+" Test Case SKIPPED", ExtentColor.ORANGE));
            test.skip(result.getThrowable());
        }
    }

	@AfterSuite
	public void tearDownReport() 
	{ // calling flush writes everything to the log file
		extent.flush();
    }
	
	@AfterTest
	public void teardown( ) {
		
	}
	

}
