import { type BrowserContext, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { headerPageRoles } from "../types/header";

export class HeaderPage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public async clickRegisterLink(): Promise<void> {
    await this.page.getByRole("link", headerPageRoles.registerLink).click();
  }

  public async clickDigitalDownloadsLink(): Promise<void> {
    await this.page
      .getByRole("link", headerPageRoles.digitalDownloadsLink)
      .click();
  }

  public async clickShoppingCartLink(): Promise<void> {
    await this.page.getByRole("link", headerPageRoles.shoppingCartLink).click();
  }

  public async getAccountEmail(): Promise<string> {
    const accountEmail = await this.page
      .locator(".header-links .account")
      .textContent();
    return accountEmail ?? "";
  }
}
