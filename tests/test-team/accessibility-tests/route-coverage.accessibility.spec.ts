import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { glob } from 'glob';
import { getAppRoutes } from '@helpers/get-app-routes';
import { IamWebAuthBasePage } from '@pages/iam-webauth-base-page';
import { IamWebAuthInactivePage } from '@pages/iam-webauth-inactive-page';
import { IamWebAuthOAuth2Page } from '@pages/iam-webauth-oauth2-page';
import { IamWebAuthRequestToBeAddedPage } from '@pages/iam-webauth-request-to-be-added-page';
import { IamWebAuthSignInPage } from '@pages/iam-webauth-signin-page';
import { IamWebAuthSignOutPage } from '@pages/iam-webauth-signout-page';

/**
 * All page objects that must have accessibility test coverage.
 *
 * When a new page is added to the frontend app, add its corresponding page
 * object here. The test below will fail until a page object covering the
 * new route is registered and a corresponding accessibility test is added.
 */
const allPages: (typeof IamWebAuthBasePage)[] = [
  IamWebAuthSignInPage,
  IamWebAuthSignOutPage,
  IamWebAuthOAuth2Page,
  IamWebAuthInactivePage,
  IamWebAuthRequestToBeAddedPage,
];

const formatList = (items: string[]) =>
  items.map((item) => `  - ${item}`).join('\n');

test('all app routes have accessibility test coverage', async () => {
  const routes = await getAppRoutes();

  const pageRoutes = allPages.map((page) => page.staticPathSegments.join('/'));

  const uncoveredRoutes = routes.filter((route) => !pageRoutes.includes(route));

  const orphanedPages = pageRoutes.filter(
    (pageRoute) => !routes.includes(pageRoute)
  );

  expect(
    uncoveredRoutes,
    `The following app routes have no accessibility test coverage. Add a page object and include it in the allPages array:\n${formatList(uncoveredRoutes)}`
  ).toHaveLength(0);

  expect(
    orphanedPages,
    `The following page objects do not match any app route. Remove or update them:\n${formatList(orphanedPages)}`
  ).toHaveLength(0);

  expect(routes).toHaveLength(allPages.length);
});

test('all page objects are used in accessibility spec files', async () => {
  const specFiles = await glob(`${__dirname}/*.accessibility.spec.ts`);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const specContents = specFiles.map((f) => readFileSync(f, 'utf8')).join('\n');

  const untestedPages = allPages.filter(
    (page) => !specContents.includes(`new ${page.name}(`)
  );

  expect(
    untestedPages.map((p) => p.name),
    `The following page objects are registered in allPages but are never instantiated in any .accessibility.spec.ts file. Write an accessibility test for each one:\n${formatList(untestedPages.map((p) => p.name))}`
  ).toHaveLength(0);
});
