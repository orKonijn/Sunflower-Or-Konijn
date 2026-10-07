import { type BrowserContext, type Locator, type Page } from "@playwright/test";
import { shoppingCartPageSelectors } from "../types/shopping-cart";
import { BasePage } from "./base.page";
import { exactTextPattern } from "../utils/extract-text";

export class ShoppingCartPage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public async getProductLink(productName: string): Promise<string> {
    const productNamePattern = exactTextPattern(productName);
    const productLink = await this.findProductLink(productNamePattern);
    const linkString = await this.extractNameFromLink(productLink);
    return linkString;
  }

  private async findProductLink(productNamePattern: RegExp): Promise<Locator> {
    const productLink = this.page
      .locator(shoppingCartPageSelectors.cartRow)
      .filter({
        has: this.page.getByRole("link", { name: productNamePattern }),
      });
    return productLink;
  }

  private async extractNameFromLink(productLink: Locator): Promise<string> {
    const linkText = await productLink.textContent();
    if (!linkText) throw new Error("Product link text is empty.");

    const linkString = linkText.trim();
    return linkString;
  }
}
