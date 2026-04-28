import { Locator, Page } from '@playwright/test';
import { IamWebAuthBasePage } from '@pages/iam-webauth-base-page';

export class IamWebAuthInactivePage extends IamWebAuthBasePage {
  static readonly pathTemplate = '/inactive';

  public readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = page.locator('[id="inactive-sign-in"]');
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }
}
