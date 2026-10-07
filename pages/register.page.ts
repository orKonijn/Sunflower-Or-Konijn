import { BrowserContext, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import {
  Gender,
  registerPageLabels,
  registerPageRoles,
  registerPageSelectors,
  RegistrationDetails,
} from "../types/register";

export class RegisterPage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public async register(details: RegistrationDetails): Promise<void> {
    await this.selectGender(details.gender);
    await this.fillNameFields(details.firstName, details.lastName);
    await this.fillEmailField(details.email);
    await this.fillPasswordFields(details.password);
    await this.clickRegisterButton();
  }

  public async getRegistrationCompletedMessage(): Promise<string> {
    const message = await this.page
      .locator(registerPageSelectors.registrationCompletedMessage)
      .textContent();
    return message?.trim() ?? "";
  }

  public async continueToStore(): Promise<void> {
    await this.page
      .getByRole("button", registerPageRoles.continueButton)
      .click();
  }

  private async selectGender(gender: Gender): Promise<void> {
    const genderOption =
      gender === "male"
        ? registerPageSelectors.maleOption
        : registerPageSelectors.femaleOption;
    await this.page.locator(genderOption).check();
  }

  private async fillNameFields(
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.page.getByLabel(registerPageLabels.firstName).fill(firstName);
    await this.page.getByLabel(registerPageLabels.lastName).fill(lastName);
  }

  private async fillEmailField(email: string): Promise<void> {
    await this.page.getByLabel(registerPageLabels.email).fill(email);
  }

  private async fillPasswordFields(password: string): Promise<void> {
    await this.page.getByLabel(registerPageLabels.password).fill(password);
    await this.page
      .getByLabel(registerPageLabels.confirmPassword)
      .fill(password);
  }

  private async clickRegisterButton(): Promise<void> {
    await this.page
      .getByRole("button", registerPageRoles.registerButton)
      .click();
  }
}
