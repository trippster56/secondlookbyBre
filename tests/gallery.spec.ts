import { expect, test } from "@playwright/test";

test.describe("take a look", () => {
  test("the reels are capped at six and the rest are a link away", async ({
    page,
  }) => {
    await page.goto("/take-a-look");

    // Every tile is either a play button or a link out; without a token there
    // are none, and the page is just the link to Instagram.
    const tiles = page.locator(
      'button[aria-label^="Play reel"], a[aria-label^="Watch on Instagram"]',
    );
    expect(await tiles.count()).toBeLessThanOrEqual(6);

    const more = page.getByRole("link", { name: /See more on Instagram/i });
    await expect(more).toBeVisible();
    await expect(more).toHaveAttribute(
      "href",
      /instagram\.com\/thesecondlookbybre/,
    );
  });

  test("the page closes with the site's one primary action", async ({ page }) => {
    await page.goto("/take-a-look");
    const cta = page.getByRole("link", { name: /Inquire about your date/i });
    await expect(cta.last()).toBeVisible();
  });
});
