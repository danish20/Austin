package selenium.tests;

import static org.junit.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class UseCase1_test
{
	private static WebDriver driver;

	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}

	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}


	//USE CASE 1.1 - Testing the functionality to get the burndown chart for a sprint
	@Test
	public void getBurndownChart() throws InterruptedException
	{
		driver.get("https://" + System.getenv("SLACK_WEB_ADDRESS") + ".slack.com/");

		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Enter our email and password
		// If running this from Eclipse, you should specify these variables in the run configurations.
		email.sendKeys(System.getenv("SLACK_EMAIL"));
		pw.sendKeys(System.getenv("SLACK_PASSWORD"));

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

		// Switch to #selenium-bot channel and wait for it to load.
		driver.get("https://" + System.getenv("SLACK_WEB_ADDRESS") + ".slack.com" + "/messages/Austin");
		wait.until(ExpectedConditions.titleContains("Austin"));

		
		
		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);

		WebElement msg = null;

		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Show Burndown charts");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'For which Sprint? Please type Sprint ID or Sprint name.']")));
		msg = driver.findElement(By.xpath("//span[contains(@class,'message_body') and text() = 'For which Sprint? Please type Sprint ID or Sprint name.']"));
		assertNotNull(msg);

		Thread.sleep(2000);

		actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("21");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		Thread.sleep(2000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Your Burndown chart for Sprint 21 is shown below']")));
		msg = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Your Burndown chart for Sprint 21 is shown below']"));
		assertNotNull(msg);


		Thread.sleep(3000);

	}


	//USE CASE 1.2 - Testing the functionality to get individual's performance chart for a sprint
	@Test
	public void getIndividualPerformanceChart() throws InterruptedException
	{
		WebDriverWait wait = new WebDriverWait(driver, 10);

		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);


		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Show performance of sandeep");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'For which sprint you want to see the performance? Enter Sprint name or ID.']")));
		WebElement msg1 = driver.findElement(By.xpath("//span[contains(@class,'message_body') and text() = 'For which sprint you want to see the performance? Enter Sprint name or ID.']"));
		assertNotNull(msg1);

		Thread.sleep(3000);

		actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("20");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		Thread.sleep(3000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Performance of sandeep for Sprint 20 is shown below']")));
		WebElement msg2 = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Performance of sandeep for Sprint 20 is shown below']"));
		assertNotNull(msg2);


		Thread.sleep(1000);

	}

	//USE CASE 1.3 - Testing the functionality to get velocity graph
	@Test
	public void getVelocityGraph() throws InterruptedException
	{
		WebDriverWait wait = new WebDriverWait(driver, 10);

		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);


		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Show velocity graph");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Your Velocity chart for all Sprints is shown below']")));
		WebElement msg1 = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Your Velocity chart for all Sprints is shown below']"));
		assertNotNull(msg1);

		Thread.sleep(3000);
		
		actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Show status of sprint 21");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Status of Sprint 21']")));
		WebElement msg2 = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Status of Sprint 21']"));
		assertNotNull(msg2);

		Thread.sleep(5000);

	}
/*	
	//USE CASE 1.4 - Testing the functionality to get sprint status
		@Test
		public void getSprintStatus() throws InterruptedException
		{
			//WebDriverWait wait = new WebDriverWait(driver, 10);

			// Type something
			//WebElement messageBot = driver.findElement(By.id("msg_input"));
			WebElement messageBot = driver.findElement(By.xpath("//div[@id='msg_input']"));
			assertNotNull(messageBot);


			Actions actions = new Actions(driver);
			actions.moveToElement(messageBot);
			actions.click();
			actions.sendKeys("Show status of sprint 21");
			actions.sendKeys(Keys.RETURN);
			actions.build().perform();

			//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Status of Sprint 21']")));
			WebElement msg1 = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Status of Sprint 21']"));
			assertNotNull(msg1);

			Thread.sleep(5000);
		}
	
*/	

}
