import { expect, test, type BrowserContext } from "@playwright/test";
import { DigitalDownloadsPage } from "../pages/digital-downloads.page";
import { HeaderPage } from "../pages/header.page";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { ShoppingCartPage } from "../pages/shopping-cart";
import { getRandomEmail } from "../utils/random";

test.describe("Registration and digital downloads cart", () => {
  let context: BrowserContext;
  let homePage: HomePage;
  let headerPage: HeaderPage;
  let registerPage: RegisterPage;
  let downloadsPage: DigitalDownloadsPage;
  let cartPage: ShoppingCartPage;

  test.beforeAll(async ({ browser, baseURL }) => {
    context = await browser.newContext({ baseURL });
    const page = await context.newPage();

    homePage = new HomePage(page, context);
    headerPage = new HeaderPage(page, context);
    registerPage = new RegisterPage(page, context);
    downloadsPage = new DigitalDownloadsPage(page, context);
    cartPage = new ShoppingCartPage(page, context);
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test.afterEach(async ({}, testInfo) => {
    const page = homePage?.page;
    if (!page || page.isClosed()) return;

    await testInfo.attach("page-screenshot", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });

  test("register, add a random digital download, and verify the cart", async () => {
    const email = getRandomEmail();

    await homePage.open();
    await headerPage.clickRegisterLink();
    await registerPage.register({
      firstName: "QA",
      gender: "female",
      lastName: "Sunflower",
      email,
      password: "Sunflower123!",
    });

    const registrationMessage =
      await registerPage.getRegistrationCompletedMessage();
    expect(registrationMessage).toMatch(/^your registration completed$/i);

    await registerPage.continueToStore();
    const accountEmail = await headerPage.getAccountEmail();
    expect(accountEmail).toBe(email);

    await headerPage.clickDigitalDownloadsLink();
    const selectedProductName = await downloadsPage.addRandomProductToCart();
    await headerPage.clickShoppingCartLink();
    const productLink = await cartPage.getProductLink(selectedProductName);
    expect(productLink).toContain(selectedProductName);
  });
});
