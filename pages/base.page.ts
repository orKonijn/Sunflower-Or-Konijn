import { type BrowserContext, type Page } from "@playwright/test";

export abstract class BasePage {
  protected constructor(
    readonly page: Page,
    readonly context: BrowserContext,
  ) {}
}
