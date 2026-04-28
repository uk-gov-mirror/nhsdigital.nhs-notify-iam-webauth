import { test } from '@fixtures/accessibility-analyze';
import { IamWebAuthInactivePage } from '@pages/iam-webauth-inactive-page';
import { IamWebAuthOAuth2Page } from '@pages/iam-webauth-oauth2-page';
import { IamWebAuthRequestToBeAddedPage } from '@pages/iam-webauth-request-to-be-added-page';
import { IamWebAuthSignInPage } from '@pages/iam-webauth-signin-page';
import { IamWebAuthSignOutPage } from '@pages/iam-webauth-signout-page';

test.describe('IAM Accessibility Tests', () => {
  test('landing page - /auth', async ({ analyze, page }) => {
    await analyze(new IamWebAuthSignInPage(page));
  });

  test('signout - /auth/signout', async ({ analyze, page }) => {
    await analyze(new IamWebAuthSignOutPage(page));
  });

  test('oauth2 - /auth/oauth2', async ({ analyze, page }) => {
    await analyze(new IamWebAuthOAuth2Page(page));
  });

  test('inactive - /auth/inactive', async ({ analyze, page }) => {
    await analyze(new IamWebAuthInactivePage(page));
  });

  test('request to be added to a service - /auth/request-to-be-added-to-a-service', async ({
    analyze,
    page,
  }) => {
    await analyze(new IamWebAuthRequestToBeAddedPage(page));
  });
});
