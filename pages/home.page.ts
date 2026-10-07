import { type BrowserContext, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public async open(): Promise<void> {
    await this.page.goto("/");
  }
}
