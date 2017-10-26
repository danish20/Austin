package selenium.tests;

import static org.junit.Assert.assertNotNull;
import io.github.bonigarcia.wdm.ChromeDriverManager;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class UseCase2_test {

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

	//USE CASE 2.4 - Testing the functionality to to compare task performance
	@Test
	public void compareTaskPerformance() throws InterruptedException
	{

		driver.get("https://" + System.getenv("SLACK_WEB_ADDRESS") + ".slack.com/");

		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 5);
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


		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Compare Task Performance in sprint 20");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();


		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Individual performance comparision of Sprint 21 is shown below.']")));
		WebElement msg2 = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Individual performance comparision of Sprint 21 is shown below.']"));
		assertNotNull(msg2);


		Thread.sleep(5000);



	}
	//USE CASE 2.3 - Testing the functionality to get who performed the most/best performer
	@Test
	public void getBestPerformer() throws InterruptedException
	{
		WebDriverWait wait = new WebDriverWait(driver, 10);

		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);


		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Compare Individual Performance in sprint 21");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();


		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Individual performance comparision of Sprint 21 is shown below.']")));
		WebElement msg2 = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Individual performance comparision of Sprint 21 is shown below.']"));
		assertNotNull(msg2);

		Thread.sleep(3000);

	}
	
	//USE CASE 2.2 - Testing the functionality to get team performance
		@Test
		public void getTeamPerformance() throws InterruptedException
		{
			WebDriverWait wait = new WebDriverWait(driver, 10);

			// Type something
			WebElement messageBot = driver.findElement(By.id("msg_input"));
			assertNotNull(messageBot);


			Actions actions = new Actions(driver);
			actions.moveToElement(messageBot);
			actions.click();
			actions.sendKeys("show team performance");
			actions.sendKeys(Keys.RETURN);
			actions.build().perform();


			wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Team performance compared to previous Sprints']")));
			WebElement msg2 = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Team performance compared to previous Sprints']"));
			assertNotNull(msg2);

			Thread.sleep(3000);

		}

	//USE CASE 2.1 - Testing the functionality to compare work done in two sprints
	@Test
	public void compareWorkInSprints() throws InterruptedException
	{
		WebDriverWait wait = new WebDriverWait(driver, 10);

		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);

		WebElement msg = null;

		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Compare work done in sprint 20 with sprint 21");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Work comparision of Sprint 20 with Sprint 21 is shown below.']")));
		msg = driver.findElement(By.xpath("//div[contains(@class,'attachment_pretext for_attachment_group') and text() = 'Work comparision of Sprint 20 with Sprint 21 is shown below.']"));
		assertNotNull(msg);


		Thread.sleep(3000);

	}


}
