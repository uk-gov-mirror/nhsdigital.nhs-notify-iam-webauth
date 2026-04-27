import { Locator, type Page } from '@playwright/test';

export abstract class IamWebAuthBasePage {
  public readonly page: Page;

  public readonly pageHeader: Locator;

  public readonly signInLink: Locator;

  public readonly signOutLink: Locator;

  static readonly pathTemplate: string;

  static readonly appUrlSegment = 'auth';

  protected searchParams = new URLSearchParams();

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('h1');
    this.signInLink = page.locator('[id="sign-in-link"]');
    this.signOutLink = page.locator('[id="sign-out-link"]');
  }

  /**
   * Returns the non-parameter segments from the path template.
   * Used by route-coverage tests to match page objects to app routes.
   */
  static get staticPathSegments(): string[] {
    return this.pathTemplate
      .split('/')
      .filter((segment) => segment !== '' && !segment.startsWith(':'));
  }

  /**
   * Sets the value of a search parameter which will be appended to the url when calling `getUrl` or `loadPage`
   * @param key The name of the search parameter to set
   * @param value The value of the search parameter
   * @returns this
   */
  setSearchParam(key: string, value: string) {
    this.searchParams.set(key, value);
    return this;
  }

  getUrl(): string {
    let url = `/${IamWebAuthBasePage.appUrlSegment}${(this.constructor as typeof IamWebAuthBasePage).pathTemplate}`;

    if (this.searchParams.size > 0) {
      url += `?${this.searchParams.toString()}`;
    }

    return url;
  }

  async loadPage(): Promise<void> {
    await this.page.goto(this.getUrl(), { waitUntil: 'load' });
  }
}
