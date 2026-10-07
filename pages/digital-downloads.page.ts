import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { digitalDownloadsPageSelectors } from "../types/digital-downloads";

export class DigitalDownloadsPage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public async addRandomProductToCart(): Promise<string> {
    const product = await this.getRandomProduct();
    const productName = await this.getProductName(product);
    await product
      .getByRole("button", digitalDownloadsPageSelectors.addToCartButton)
      .click();
    await expect(
      this.page.getByRole("link", { name: /^shopping cart \(1\)$/i }),
    ).toBeVisible();

    return productName;
  }

  private async getRandomProduct(): Promise<Locator> {
    const products = this.page.locator(
      digitalDownloadsPageSelectors.productCard,
    );
    await expect(products.first()).toBeVisible();

    const productCount = await products.count();
    return products.nth(Math.floor(Math.random() * productCount));
  }

  private async getProductName(product: Locator): Promise<string> {
    const productName = await product
      .locator(digitalDownloadsPageSelectors.productNameLink)
      .innerText();
    return productName.trim();
  }
}
