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

public class WebTest
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
		driver.get("https://" + System.getenv("SLACK_WEB_ADDRESS") + ".slack.com" + "/messages/mybot");
		wait.until(ExpectedConditions.titleContains("mybot"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
			
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Show Burndown charts");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		
		Thread.sleep(2000);
		
		actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("20");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		
		Thread.sleep(5000);

		List<WebElement> msgs = driver.findElements(By.xpath("//span[@class='message_body']"));
		assertNotNull(msgs);
		WebElement lastMsg = msgs.get(msgs.size()-1);
		assertNotNull(lastMsg);
		//System.out.println(lastMsg.getText());
		WebElement pretext_div = lastMsg.findElement(By.xpath("//div[@class='attachment_pretext for_attachment_group']"));
		assertNotNull(pretext_div);
		assertEquals("Your Burndown chart for Sprint 20 is shown below", pretext_div.getText());
		System.out.println(pretext_div.getText());
				
	}
	
	@Test
	public void getMostUserCommits() throws InterruptedException
	{
		System.out.println("in second test case");
		driver.get("https://" + System.getenv("SLACK_WEB_ADDRESS") + ".slack.com/");


		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
			
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Who has made most number of commits?");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		
		Thread.sleep(5000);

		List<WebElement> msgs = driver.findElements(By.xpath("//span[@class='message_body']"));
		assertNotNull(msgs);
		WebElement lastMsg = msgs.get(msgs.size()-1);
		assertNotNull(lastMsg);
		
		assertEquals("dsuri has most number of commits with 44 commits.", lastMsg.getText());
		System.out.println(lastMsg.getText());
		
		
		
	}


}
