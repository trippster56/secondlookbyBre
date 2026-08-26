import { expect, test } from "@playwright/test";

/** Every indexable route, with the copy that proves the page actually rendered. */
const routes = [
  { path: "/", h1: /Wedding day content creation/i },
  { path: "/take-a-look", h1: /Take a Look/i },
  { path: "/pricing", h1: /Wedding content, built around your day/i },
];

test.describe("routes", () => {
  for (const route of routes) {
    test(`${route.path} renders with complete metadata`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      // Exactly one h1, and it is the one this page is about.
      const headings = page.locator("h1");
      await expect(headings).toHaveCount(1);
      await expect(headings.first()).toHaveText(route.h1);

      await expect(page).toHaveTitle(/The Second Look/i);

      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute("content", /.{50,}/);

      // The home page's canonical is the bare origin; the others carry the path.
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute(
        "href",
        route.path === "/" ? /^https?:\/\/[^/]+\/?$/ : new RegExp(`${route.path}$`),
      );

      // Open Graph, on every route.
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    });
  }

  test("the business is described in structured data", async ({ page }) => {
    await page.goto("/");
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const types = blocks.map((block) => JSON.parse(block)["@type"]);
    expect(types).toContain("ProfessionalService");
    expect(types).toContain("FAQPage");
  });

  test("an unknown route renders the 404 page", async ({ page }) => {
    const response = await page.goto("/not-a-real-page");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText(/slipped away/i);
  });
});
