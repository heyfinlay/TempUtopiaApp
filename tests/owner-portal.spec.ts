import { test, expect, type Page } from "@playwright/test";

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const email = process.env.PLAYWRIGHT_EMAIL;
const password = process.env.PLAYWRIGHT_PASSWORD;

async function loginIfPossible(page: Page) {
  if (!email || !password) return false;
  await page.goto(`${baseUrl}/login`);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL(/\/owner/);
  return true;
}

test.describe("Owner portal", () => {
  test("auth visibility: /owner redirects when logged out", async ({ page }) => {
    await page.goto(`${baseUrl}/owner`);
    await expect(page).toHaveURL(/\/login/);
  });

  test("auth visibility: identity visible when logged in", async ({ page }) => {
    const loggedIn = await loginIfPossible(page);
    test.skip(!loggedIn, "No test credentials provided");
    await expect(page.locator(".avatar")).toBeVisible();
  });

  test("navigation: View all leads navigates to leads page", async ({ page }) => {
    await page.goto(`${baseUrl}/owner`);
    await page.getByRole("button", { name: /view all leads/i }).click();
    await expect(page).toHaveURL(/\/owner\/leads|\/leads/);
  });

  test("navigation: Work log shows DB-backed entries or empty state", async ({ page }) => {
    await page.goto(`${baseUrl}/owner`);
    await page.getByRole("button", { name: /work log/i }).click();
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test("search: filters work log results", async ({ page }) => {
    await page.goto(`${baseUrl}/owner`);
    await page.getByPlaceholder("Search tasks, leads, companies…").fill("clinics");
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test("search: lead matches and navigates to lead detail", async ({ page }) => {
    await page.goto(`${baseUrl}/owner`);
    await page.getByRole("button", { name: /leads/i }).click();
    await page.getByPlaceholder("Search tasks, leads, companies…").fill("Vogue");
    await expect(page.getByText(/Vogue/i)).toBeVisible();
    await page.getByText(/Vogue/i).click();
    await expect(page).toHaveURL(/\/owner\/leads\/|\/leads\//);
  });
});
