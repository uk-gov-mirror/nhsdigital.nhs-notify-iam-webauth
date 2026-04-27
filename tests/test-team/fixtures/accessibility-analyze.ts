import { Page, test as base, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { IamWebAuthBasePage } from '@pages/iam-webauth-base-page';

type Analyze = <T extends IamWebAuthBasePage>(
  page: T,
  opts?: {
    beforeAnalyze?: (page: T) => Promise<void>;
  }
) => Promise<void>;

type AccessibilityFixture = {
  analyze: Analyze;
};

const DISABLED_RULES = [
  /* We don't have control over NHS / CIS2 colours. */
  'color-contrast-enhanced',
];

const DEFAULT_REDIRECT_PATH = '/templates/message-templates';

const makeAxeBuilder = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
    .disableRules(DISABLED_RULES);

export const test = base.extend<AccessibilityFixture>({
  analyze: async ({ page }, use) => {
    const analyze: Analyze = async (pageUnderTest, opts) => {
      const { beforeAnalyze } = opts ?? {};

      pageUnderTest.setSearchParam('redirect', DEFAULT_REDIRECT_PATH);

      await pageUnderTest.loadPage();

      if (beforeAnalyze) {
        await beforeAnalyze(pageUnderTest);
      }

      await expect(page).toHaveURL(pageUnderTest.getUrl());

      const results = await makeAxeBuilder(page).analyze();

      expect(results.violations).toEqual([]);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(analyze);
  },
});
