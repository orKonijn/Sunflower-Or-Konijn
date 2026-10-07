import { type BrowserContext, type Locator, type Page } from "@playwright/test";
import { shoppingCartPageSelectors } from "../types/shopping-cart";
import { BasePage } from "./base.page";
import { exactTextPattern } from "../utils/extract-text";

export class ShoppingCartPage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public getProductLink(productName: string): Locator {
    const productNamePattern = exactTextPattern(productName);
    return this.page
      .locator(shoppingCartPageSelectors.cartRow)
      .getByRole("link", { name: productNamePattern });
  }
}
