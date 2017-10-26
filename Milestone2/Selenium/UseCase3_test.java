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

public class UseCase3_test {

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

	//USE CASE 3 - Testing the functionality to get the user who made the most number of commits for the current sprint
	@Test
	public void getMostUserCommits() throws InterruptedException
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


		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("Who has made most number of commits?");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		Thread.sleep(2000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'dsuri has most number of commits with 44 commits.']")));
		WebElement msg = driver.findElement(By.xpath("//span[contains(@class,'message_body') and text() = 'dsuri has most number of commits with 44 commits.']"));
		assertNotNull(msg);

		Thread.sleep(3000);

	}


}
