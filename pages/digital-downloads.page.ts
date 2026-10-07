import { BrowserContext, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { digitalDownloadsPageSelectors } from "../types/digital-downloads";

export class DigitalDownloadsPage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public async addRandomProductToCart(): Promise<string> {
    const products = await this.getProducts();
    const product = products[Math.floor(Math.random() * products.length)];
    const productName = await this.getProductName(product);
    await product
      .getByRole("button", digitalDownloadsPageSelectors.addToCartButton)
      .click();

    return productName;
  }

  private async getProducts(): Promise<Locator[]> {
    const products = await this.page
      .locator(digitalDownloadsPageSelectors.productCard)
      .all();

    if (products.length === 0) {
      throw new Error("No Digital Downloads products were found.");
    }
    return products;
  }

  private async getProductName(product: Locator): Promise<string> {
    const productName = await product
      .locator(digitalDownloadsPageSelectors.productNameLink)
      .innerText();
    return productName.trim();
  }
}
